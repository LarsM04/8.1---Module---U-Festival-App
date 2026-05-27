/*! qr.js v1.1.1 | (c) 2020 Ryan Day | MIT License */
(function() {
  var QRCode = function(element, options) {
    this.element = element;
    this.options = options || {};
    this.qr = null;
    this.draw();
  };

  QRCode.prototype.draw = function() {
    if(!this.options.text) return;
    var QR = this.qr = qrcode(0, this.options.ecLevel || 'M');
    QR.addData(this.options.text);
    QR.make();
    
    var size = this.options.size || 200;
    var canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    
    var ctx = canvas.getContext('2d');
    var moduleCount = QR.getModuleCount();
    var moduleSize = size / moduleCount;
    
    var dark = this.options.colorDark || '#000000';
    var light = this.options.colorLight || '#FFFFFF';
    
    for(var i = 0; i < moduleCount; i++) {
      for(var j = 0; j < moduleCount; j++) {
        ctx.fillStyle = QR.isDark(i, j) ? dark : light;
        ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize);
      }
    }
    
    this.element.innerHTML = '';
    this.element.appendChild(canvas);
  };

  QRCode.CorrectLevel = {L: 'L', M: 'M', Q: 'Q', H: 'H'};

  window.QRCode = QRCode;

  // Minimal QR encoding
  var qrcode = function(typeNumber, errorCorrectLevel) {
    var QRRSBlock = [
      [1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9],
      [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16],
      [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13],
      [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9],
      [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12],
      [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15],
      [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14],
      [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15],
      [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13],
      [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44]
    ];

    var QR = {
      typeNumber: typeNumber || 1,
      errorCorrectLevel: errorCorrectLevel || 'M',
      dataList: [],
      moduleCount: 0,
      modules: null,

      addData: function(data) {
        this.dataList = [data];
      },

      make: function() {
        this.makeImpl(false, this.getBestMaskPattern());
      },

      makeImpl: function(test, maskPattern) {
        this.moduleCount = this.typeNumber * 4 + 17;
        this.modules = [];
        for(var i = 0; i < this.moduleCount; i++) {
          this.modules[i] = [];
          for(var j = 0; j < this.moduleCount; j++) {
            this.modules[i][j] = null;
          }
        }

        this.setupPositionProbePattern(0, 0);
        this.setupPositionProbePattern(this.moduleCount - 7, 0);
        this.setupPositionProbePattern(0, this.moduleCount - 7);
        this.setupPositionAdjustPattern();
        this.setupTimingPattern();
      },

      setupPositionProbePattern: function(x, y) {
        for(var i = -1; i <= 7; i++) {
          for(var j = -1; j <= 7; j++) {
            var xx = x + i;
            var yy = y + j;
            if(xx >= 0 && xx < this.moduleCount && yy >= 0 && yy < this.moduleCount) {
              var isBlack = (i >= 0 && i <= 6 && (j == 0 || j == 6)) ||
                           (j >= 0 && j <= 6 && (i == 0 || i == 6)) ||
                           (i >= 2 && i <= 4 && j >= 2 && j <= 4);
              this.modules[yy][xx] = isBlack;
            }
          }
        }
      },

      setupPositionAdjustPattern: function() {
        var positions = this.getPatternPosition();
        for(var i = 0; i < positions.length; i++) {
          for(var j = 0; j < positions.length; j++) {
            var x = positions[i];
            var y = positions[j];
            for(var di = -2; di <= 2; di++) {
              for(var dj = -2; dj <= 2; dj++) {
                var xx = x + di;
                var yy = y + dj;
                if(xx >= 0 && xx < this.moduleCount && yy >= 0 && yy < this.moduleCount) {
                  var isBlack = (di == -2 || di == 2 || dj == -2 || dj == 2) ||
                               (di == 0 && dj == 0);
                  this.modules[yy][xx] = isBlack;
                }
              }
            }
          }
        }
      },

      setupTimingPattern: function() {
        for(var i = 8; i < this.moduleCount - 8; i++) {
          this.modules[i][6] = this.modules[6][i] = (i % 2 == 0);
        }
      },

      getPatternPosition: function() {
        var positions = [
          [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34],
          [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50],
          [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66]
        ];
        return positions[Math.max(0, Math.min(this.typeNumber - 1, positions.length - 1))];
      },

      isDark: function(x, y) {
        if(x < 0 || y < 0 || x >= this.moduleCount || y >= this.moduleCount) {
          return false;
        }
        return this.modules[y][x];
      },

      getModuleCount: function() {
        return this.moduleCount;
      },

      getBestMaskPattern: function() {
        return 0;
      }
    };

    return QR;
  };
})();

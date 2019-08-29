"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** 创建自增key */
var getCreateKeyFn = function () { var i = 0; return function () { return i++; }; };
/** 确保是数组 */
var ensureArray = function (arr) { return arr instanceof Array ? arr : []; };
var cloneFormArray = function (formArray) {
    var fa = new FormArray();
    fa.createKey = formArray.createKey;
    return fa;
};
var FormArray = /** @class */ (function () {
    function FormArray(list) {
        if (list === void 0) { list = []; }
        var _this = this;
        this.createKey = getCreateKeyFn();
        this.convert = function (item) {
            return { key: _this.createKey(), value: item };
        };
        this._list = list.map(this.convert);
    }
    Object.defineProperty(FormArray.prototype, "list", {
        get: function () {
            return this._list.map(function (v) { return v.value; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormArray.prototype, "length", {
        get: function () {
            return this._list.length;
        },
        enumerable: true,
        configurable: true
    });
    FormArray.prototype.render = function (fn) {
        return this._list.map(function (_a, index) {
            var key = _a.key, value = _a.value;
            return fn(value, key, index);
        });
    };
    FormArray.prototype.map = function (fn) {
        var fa = new FormArray();
        fa.createKey = this.createKey;
        fa._list = this._list.map(function (_a) {
            var key = _a.key, value = _a.value;
            return ({ key: key, value: fn(value) });
        });
        return fa;
    };
    FormArray.prototype.add = function () {
        var newItems = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newItems[_i] = arguments[_i];
        }
        var fa = cloneFormArray(this);
        fa._list = this._list.concat(newItems.map(this.convert));
        return fa;
    };
    FormArray.prototype.delete = function () {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        var fa = cloneFormArray(this);
        fa._list = this._list.filter(function (item) { return !keys.some(function (key) { return key === item.key; }); });
        return fa;
    };
    return FormArray;
}());
exports.FormArray = FormArray;
exports.createFormArray = function (list, minLen) {
    if (minLen === void 0) { minLen = 0; }
    var arr = ensureArray(list);
    var restLen = minLen - arr.length;
    return new FormArray(restLen > 0 ? arr.concat(Array.from({ length: restLen })) :
        arr);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGNBQWM7QUFDZCxJQUFNLGNBQWMsR0FBRyxjQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sY0FBTSxPQUFBLENBQUMsRUFBRSxFQUFILENBQUcsQ0FBQSxDQUFDLENBQUMsQ0FBQztBQUU3RCxZQUFZO0FBQ1osSUFBTSxXQUFXLEdBQUcsVUFBSSxHQUFRLElBQVUsT0FBQSxHQUFHLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBL0IsQ0FBK0IsQ0FBQztBQUUxRSxJQUFNLGNBQWMsR0FBRyxVQUFJLFNBQXVCO0lBQ2hELElBQU0sRUFBRSxHQUFHLElBQUksU0FBUyxFQUFLLENBQUM7SUFDOUIsRUFBRSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO0lBQ25DLE9BQU8sRUFBRSxDQUFDO0FBQ1osQ0FBQyxDQUFDO0FBRUY7SUFLRSxtQkFBWSxJQUFjO1FBQWQscUJBQUEsRUFBQSxTQUFjO1FBQTFCLGlCQUVDO1FBSkQsY0FBUyxHQUFHLGNBQWMsRUFBRSxDQUFDO1FBTXJCLFlBQU8sR0FBRyxVQUFDLElBQU87WUFDeEIsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFBO1FBQy9DLENBQUMsQ0FBQTtRQUxDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQU1ELHNCQUFJLDJCQUFJO2FBQVI7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssRUFBUCxDQUFPLENBQUMsQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDZCQUFNO2FBQVY7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBRUQsMEJBQU0sR0FBTixVQUFPLEVBQWlEO1FBQ3RELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQyxFQUFjLEVBQUUsS0FBSztnQkFBbkIsWUFBRyxFQUFFLGdCQUFLO1lBQWMsT0FBQSxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUM7UUFBckIsQ0FBcUIsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCx1QkFBRyxHQUFILFVBQU8sRUFBbUI7UUFDeEIsSUFBTSxFQUFFLEdBQUcsSUFBSSxTQUFTLEVBQUssQ0FBQztRQUM5QixFQUFFLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFFOUIsRUFBRSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEVBQWM7Z0JBQVosWUFBRyxFQUFFLGdCQUFLO1lBQU8sT0FBQSxDQUFDLEVBQUUsR0FBRyxLQUFBLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQTNCLENBQTJCLENBQUMsQ0FBQztRQUUzRSxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCx1QkFBRyxHQUFIO1FBQUksa0JBQWdCO2FBQWhCLFVBQWdCLEVBQWhCLHFCQUFnQixFQUFoQixJQUFnQjtZQUFoQiw2QkFBZ0I7O1FBQ2xCLElBQU0sRUFBRSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoQyxFQUFFLENBQUMsS0FBSyxHQUFPLElBQUksQ0FBQyxLQUFLLFFBQUssUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUUxRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCwwQkFBTSxHQUFOO1FBQU8sY0FBaUI7YUFBakIsVUFBaUIsRUFBakIscUJBQWlCLEVBQWpCLElBQWlCO1lBQWpCLHlCQUFpQjs7UUFDdEIsSUFBTSxFQUFFLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBaEIsQ0FBZ0IsQ0FBQyxFQUFuQyxDQUFtQyxDQUFDLENBQUM7UUFFMUUsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDLEFBakRELElBaURDO0FBakRZLDhCQUFTO0FBbURULFFBQUEsZUFBZSxHQUFHLFVBQUksSUFBUyxFQUFFLE1BQVU7SUFBVix1QkFBQSxFQUFBLFVBQVU7SUFFdEQsSUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTlCLElBQU0sT0FBTyxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBRXBDLE9BQU8sSUFBSSxTQUFTLENBQ2xCLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUNQLEdBQUcsUUFBSyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFRLEVBQUUsQ0FBQztRQUNyRCxHQUFHLENBQ04sQ0FBQztBQUNKLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKiDliJvlu7roh6rlop5rZXkgKi9cclxuY29uc3QgZ2V0Q3JlYXRlS2V5Rm4gPSAoKSA9PiB7IGxldCBpID0gMDsgcmV0dXJuICgpID0+IGkrKyB9O1xyXG5cclxuLyoqIOehruS/neaYr+aVsOe7hCAqL1xyXG5jb25zdCBlbnN1cmVBcnJheSA9IDxUPihhcnI6IFRbXSk6IFRbXSA9PiBhcnIgaW5zdGFuY2VvZiBBcnJheSA/IGFyciA6IFtdO1xyXG5cclxuY29uc3QgY2xvbmVGb3JtQXJyYXkgPSA8VD4oZm9ybUFycmF5OiBGb3JtQXJyYXk8VD4pID0+IHtcclxuICBjb25zdCBmYSA9IG5ldyBGb3JtQXJyYXk8VD4oKTtcclxuICBmYS5jcmVhdGVLZXkgPSBmb3JtQXJyYXkuY3JlYXRlS2V5O1xyXG4gIHJldHVybiBmYTtcclxufTtcclxuXHJcbmV4cG9ydCBjbGFzcyBGb3JtQXJyYXk8VD4ge1xyXG5cclxuICBfbGlzdDogQXJyYXk8eyBrZXk6IG51bWJlcjsgdmFsdWU6IFQ7IH0+O1xyXG4gIGNyZWF0ZUtleSA9IGdldENyZWF0ZUtleUZuKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGxpc3Q6IFRbXSA9IFtdKSB7XHJcbiAgICB0aGlzLl9saXN0ID0gbGlzdC5tYXAodGhpcy5jb252ZXJ0KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29udmVydCA9IChpdGVtOiBUKSA9PiB7XHJcbiAgICByZXR1cm4geyBrZXk6IHRoaXMuY3JlYXRlS2V5KCksIHZhbHVlOiBpdGVtIH1cclxuICB9XHJcblxyXG4gIGdldCBsaXN0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xpc3QubWFwKHYgPT4gdi52YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXQgbGVuZ3RoKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xpc3QubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKGZuOiAodmFsdWU6IFQsIGtleTogbnVtYmVyLCBpbmRleDogbnVtYmVyKSA9PiBhbnkpIHtcclxuICAgIHJldHVybiB0aGlzLl9saXN0Lm1hcCgoeyBrZXksIHZhbHVlIH0sIGluZGV4KSA9PiBmbih2YWx1ZSwga2V5LCBpbmRleCkpO1xyXG4gIH1cclxuXHJcbiAgbWFwPE4+KGZuOiAodmFsdWU6IFQpID0+IE4pOiBGb3JtQXJyYXk8Tj4ge1xyXG4gICAgY29uc3QgZmEgPSBuZXcgRm9ybUFycmF5PE4+KCk7XHJcbiAgICBmYS5jcmVhdGVLZXkgPSB0aGlzLmNyZWF0ZUtleTtcclxuXHJcbiAgICBmYS5fbGlzdCA9IHRoaXMuX2xpc3QubWFwKCh7IGtleSwgdmFsdWUgfSkgPT4gKHsga2V5LCB2YWx1ZTogZm4odmFsdWUpIH0pKTtcclxuXHJcbiAgICByZXR1cm4gZmE7XHJcbiAgfVxyXG5cclxuICBhZGQoLi4ubmV3SXRlbXM6IFRbXSk6IEZvcm1BcnJheTxUPiB7XHJcbiAgICBjb25zdCBmYSA9IGNsb25lRm9ybUFycmF5KHRoaXMpO1xyXG5cclxuICAgIGZhLl9saXN0ID0gWy4uLnRoaXMuX2xpc3QsIC4uLm5ld0l0ZW1zLm1hcCh0aGlzLmNvbnZlcnQpXTtcclxuXHJcbiAgICByZXR1cm4gZmE7XHJcbiAgfVxyXG5cclxuICBkZWxldGUoLi4ua2V5czogbnVtYmVyW10pOiBGb3JtQXJyYXk8VD4ge1xyXG4gICAgY29uc3QgZmEgPSBjbG9uZUZvcm1BcnJheSh0aGlzKTtcclxuXHJcbiAgICBmYS5fbGlzdCA9IHRoaXMuX2xpc3QuZmlsdGVyKGl0ZW0gPT4gIWtleXMuc29tZShrZXkgPT4ga2V5ID09PSBpdGVtLmtleSkpO1xyXG5cclxuICAgIHJldHVybiBmYTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVGb3JtQXJyYXkgPSA8VD4obGlzdDogVFtdLCBtaW5MZW4gPSAwKSA9PiB7XHJcblxyXG4gIGNvbnN0IGFyciA9IGVuc3VyZUFycmF5KGxpc3QpO1xyXG5cclxuICBjb25zdCByZXN0TGVuID0gbWluTGVuIC0gYXJyLmxlbmd0aDtcclxuXHJcbiAgcmV0dXJuIG5ldyBGb3JtQXJyYXkoXHJcbiAgICByZXN0TGVuID4gMCA/XHJcbiAgICAgIFsuLi5hcnIsIC4uLkFycmF5LmZyb20oeyBsZW5ndGg6IHJlc3RMZW4gfSkgYXMgVFtdXSA6XHJcbiAgICAgIGFyclxyXG4gICk7XHJcbn1cclxuIl19
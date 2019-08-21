"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** 创建自增key */
var getCreateKeyFn = function () { var i = 0; return function () { return i++; }; };
/** 确保是数组 */
var ensureArray = function (arr) { return arr instanceof Array ? arr : []; };
var FormArray = /** @class */ (function () {
    function FormArray(list) {
        if (list === void 0) { list = []; }
        this._createKey = getCreateKeyFn();
        this._list = list.map(this.convert);
    }
    FormArray.prototype.convert = function (item) {
        return { key: this._createKey(), value: item };
    };
    Object.defineProperty(FormArray.prototype, "list", {
        get: function () {
            return this._list;
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
        return this._list.map(function (_a) {
            var key = _a.key, value = _a.value;
            return fn(value, key);
        });
    };
    FormArray.prototype.map = function (fn) {
        this._list = this._list.map(function (_a) {
            var key = _a.key, value = _a.value;
            return ({ key: key, value: fn(value) });
        });
        return this;
    };
    FormArray.prototype.add = function () {
        var newItems = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newItems[_i] = arguments[_i];
        }
        this._list = this._list.concat(newItems.map(this.convert));
        return this;
    };
    FormArray.prototype.delete = function () {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        this._list = this._list.filter(function (item) { return !keys.some(function (key) { return key === item.key; }); });
        return this;
    };
    return FormArray;
}());
exports.FormArray = FormArray;
exports.createFormArray = function (list, minLen) {
    if (minLen === void 0) { minLen = 1; }
    var restLen = minLen - list.length;
    var restArr = Array.from({ length: restLen < 0 ? 0 : restLen });
    return new FormArray(ensureArray(list).concat(restArr));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGNBQWM7QUFDZCxJQUFNLGNBQWMsR0FBRyxjQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sY0FBTSxPQUFBLENBQUMsRUFBRSxFQUFILENBQUcsQ0FBQSxDQUFDLENBQUMsQ0FBQztBQUU3RCxZQUFZO0FBQ1osSUFBTSxXQUFXLEdBQUcsVUFBSSxHQUFRLElBQVUsT0FBQSxHQUFHLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBL0IsQ0FBK0IsQ0FBQztBQUUxRTtJQUtFLG1CQUFZLElBQWM7UUFBZCxxQkFBQSxFQUFBLFNBQWM7UUFGbEIsZUFBVSxHQUFHLGNBQWMsRUFBRSxDQUFDO1FBR3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVPLDJCQUFPLEdBQWYsVUFBZ0IsSUFBTztRQUNyQixPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUE7SUFDaEQsQ0FBQztJQUVELHNCQUFJLDJCQUFJO2FBQVI7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSw2QkFBTTthQUFWO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUVELDBCQUFNLEdBQU4sVUFBTyxFQUFrQztRQUN2QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsRUFBYztnQkFBWixZQUFHLEVBQUUsZ0JBQUs7WUFBTyxPQUFBLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1FBQWQsQ0FBYyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELHVCQUFHLEdBQUgsVUFBSSxFQUFxQjtRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsRUFBYztnQkFBWixZQUFHLEVBQUUsZ0JBQUs7WUFBTyxPQUFBLENBQUMsRUFBRSxHQUFHLEtBQUEsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFBM0IsQ0FBMkIsQ0FBQyxDQUFDO1FBQzdFLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELHVCQUFHLEdBQUg7UUFBSSxrQkFBZ0I7YUFBaEIsVUFBZ0IsRUFBaEIscUJBQWdCLEVBQWhCLElBQWdCO1lBQWhCLDZCQUFnQjs7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBTyxJQUFJLENBQUMsS0FBSyxRQUFLLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDNUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsMEJBQU0sR0FBTjtRQUFPLGNBQWlCO2FBQWpCLFVBQWlCLEVBQWpCLHFCQUFpQixFQUFqQixJQUFpQjtZQUFqQix5QkFBaUI7O1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBaEIsQ0FBZ0IsQ0FBQyxFQUFuQyxDQUFtQyxDQUFDLENBQUM7UUFDNUUsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDLEFBdkNELElBdUNDO0FBdkNZLDhCQUFTO0FBeUNULFFBQUEsZUFBZSxHQUFHLFVBQUksSUFBUyxFQUFFLE1BQVU7SUFBVix1QkFBQSxFQUFBLFVBQVU7SUFDdEQsSUFBTSxPQUFPLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckMsSUFBTSxPQUFPLEdBQVEsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFFdkUsT0FBTyxJQUFJLFNBQVMsQ0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQUssT0FBTyxFQUFFLENBQUM7QUFDM0QsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIOWIm+W7uuiHquWinmtleSAqL1xyXG5jb25zdCBnZXRDcmVhdGVLZXlGbiA9ICgpID0+IHsgbGV0IGkgPSAwOyByZXR1cm4gKCkgPT4gaSsrIH07XHJcblxyXG4vKiog56Gu5L+d5piv5pWw57uEICovXHJcbmNvbnN0IGVuc3VyZUFycmF5ID0gPFQ+KGFycjogVFtdKTogVFtdID0+IGFyciBpbnN0YW5jZW9mIEFycmF5ID8gYXJyIDogW107XHJcblxyXG5leHBvcnQgY2xhc3MgRm9ybUFycmF5PFQ+IHtcclxuXHJcbiAgcHJpdmF0ZSBfbGlzdDogQXJyYXk8eyBrZXk6IG51bWJlcjsgdmFsdWU6IFQ7IH0+O1xyXG4gIHByaXZhdGUgX2NyZWF0ZUtleSA9IGdldENyZWF0ZUtleUZuKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGxpc3Q6IFRbXSA9IFtdKSB7XHJcbiAgICB0aGlzLl9saXN0ID0gbGlzdC5tYXAodGhpcy5jb252ZXJ0KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29udmVydChpdGVtOiBUKSB7XHJcbiAgICByZXR1cm4geyBrZXk6IHRoaXMuX2NyZWF0ZUtleSgpLCB2YWx1ZTogaXRlbSB9XHJcbiAgfVxyXG5cclxuICBnZXQgbGlzdCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9saXN0O1xyXG4gIH1cclxuXHJcbiAgZ2V0IGxlbmd0aCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9saXN0Lmxlbmd0aDtcclxuICB9XHJcblxyXG4gIHJlbmRlcihmbjogKHZhbHVlOiBULCBrZXk6IG51bWJlcikgPT4gYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbGlzdC5tYXAoKHsga2V5LCB2YWx1ZSB9KSA9PiBmbih2YWx1ZSwga2V5KSk7XHJcbiAgfVxyXG5cclxuICBtYXAoZm46ICh2YWx1ZTogVCkgPT4gYW55KSB7XHJcbiAgICB0aGlzLl9saXN0ID0gdGhpcy5fbGlzdC5tYXAoKHsga2V5LCB2YWx1ZSB9KSA9PiAoeyBrZXksIHZhbHVlOiBmbih2YWx1ZSkgfSkpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBhZGQoLi4ubmV3SXRlbXM6IFRbXSkge1xyXG4gICAgdGhpcy5fbGlzdCA9IFsuLi50aGlzLl9saXN0LCAuLi5uZXdJdGVtcy5tYXAodGhpcy5jb252ZXJ0KV07XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGRlbGV0ZSguLi5rZXlzOiBudW1iZXJbXSkge1xyXG4gICAgdGhpcy5fbGlzdCA9IHRoaXMuX2xpc3QuZmlsdGVyKGl0ZW0gPT4gIWtleXMuc29tZShrZXkgPT4ga2V5ID09PSBpdGVtLmtleSkpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlRm9ybUFycmF5ID0gPFQ+KGxpc3Q6IFRbXSwgbWluTGVuID0gMSkgPT4ge1xyXG4gIGNvbnN0IHJlc3RMZW4gPSBtaW5MZW4gLSBsaXN0Lmxlbmd0aDtcclxuICBjb25zdCByZXN0QXJyOiBUW10gPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiByZXN0TGVuIDwgMCA/IDAgOiByZXN0TGVuIH0pO1xyXG5cclxuICByZXR1cm4gbmV3IEZvcm1BcnJheShbLi4uZW5zdXJlQXJyYXkobGlzdCksIC4uLnJlc3RBcnJdKTtcclxufVxyXG4iXX0=
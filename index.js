"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** 创建自增key */
var getCreateKeyFn = function () { var i = 0; return function () { return i++; }; };
/** 确保是数组 */
var ensureArray = function (arr) { return arr instanceof Array ? arr : []; };
var FormArray = /** @class */ (function () {
    function FormArray(list) {
        if (list === void 0) { list = []; }
        var _this = this;
        this._createKey = getCreateKeyFn();
        this.convert = function (item) {
            return { key: _this._createKey(), value: item };
        };
        this._list = list.map(this.convert);
    }
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
    return new FormArray(restLen > 0 ? ensureArray(list).concat(Array(restLen)) :
        ensureArray(list));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGNBQWM7QUFDZCxJQUFNLGNBQWMsR0FBRyxjQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sY0FBTSxPQUFBLENBQUMsRUFBRSxFQUFILENBQUcsQ0FBQSxDQUFDLENBQUMsQ0FBQztBQUU3RCxZQUFZO0FBQ1osSUFBTSxXQUFXLEdBQUcsVUFBSSxHQUFRLElBQVUsT0FBQSxHQUFHLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBL0IsQ0FBK0IsQ0FBQztBQUUxRTtJQUtFLG1CQUFZLElBQWM7UUFBZCxxQkFBQSxFQUFBLFNBQWM7UUFBMUIsaUJBRUM7UUFKTyxlQUFVLEdBQUcsY0FBYyxFQUFFLENBQUM7UUFNOUIsWUFBTyxHQUFHLFVBQUMsSUFBTztZQUN4QixPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUE7UUFDaEQsQ0FBQyxDQUFBO1FBTEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBTUQsc0JBQUksMkJBQUk7YUFBUjtZQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDZCQUFNO2FBQVY7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBRUQsMEJBQU0sR0FBTixVQUFPLEVBQWtDO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQyxFQUFjO2dCQUFaLFlBQUcsRUFBRSxnQkFBSztZQUFPLE9BQUEsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7UUFBZCxDQUFjLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsdUJBQUcsR0FBSCxVQUFJLEVBQXFCO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQyxFQUFjO2dCQUFaLFlBQUcsRUFBRSxnQkFBSztZQUFPLE9BQUEsQ0FBQyxFQUFFLEdBQUcsS0FBQSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUEzQixDQUEyQixDQUFDLENBQUM7UUFDN0UsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsdUJBQUcsR0FBSDtRQUFJLGtCQUFnQjthQUFoQixVQUFnQixFQUFoQixxQkFBZ0IsRUFBaEIsSUFBZ0I7WUFBaEIsNkJBQWdCOztRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFPLElBQUksQ0FBQyxLQUFLLFFBQUssUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM1RCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCwwQkFBTSxHQUFOO1FBQU8sY0FBaUI7YUFBakIsVUFBaUIsRUFBakIscUJBQWlCLEVBQWpCLElBQWlCO1lBQWpCLHlCQUFpQjs7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFoQixDQUFnQixDQUFDLEVBQW5DLENBQW1DLENBQUMsQ0FBQztRQUM1RSxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUF2Q0QsSUF1Q0M7QUF2Q1ksOEJBQVM7QUF5Q1QsUUFBQSxlQUFlLEdBQUcsVUFBSSxJQUFTLEVBQUUsTUFBVTtJQUFWLHVCQUFBLEVBQUEsVUFBVTtJQUV0RCxJQUFNLE9BQU8sR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUVyQyxPQUFPLElBQUksU0FBUyxDQUNsQixPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FDUCxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQUssS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDM0MsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUNwQixDQUFDO0FBQ0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIOWIm+W7uuiHquWinmtleSAqL1xyXG5jb25zdCBnZXRDcmVhdGVLZXlGbiA9ICgpID0+IHsgbGV0IGkgPSAwOyByZXR1cm4gKCkgPT4gaSsrIH07XHJcblxyXG4vKiog56Gu5L+d5piv5pWw57uEICovXHJcbmNvbnN0IGVuc3VyZUFycmF5ID0gPFQ+KGFycjogVFtdKTogVFtdID0+IGFyciBpbnN0YW5jZW9mIEFycmF5ID8gYXJyIDogW107XHJcblxyXG5leHBvcnQgY2xhc3MgRm9ybUFycmF5PFQ+IHtcclxuXHJcbiAgcHJpdmF0ZSBfbGlzdDogQXJyYXk8eyBrZXk6IG51bWJlcjsgdmFsdWU6IFQ7IH0+O1xyXG4gIHByaXZhdGUgX2NyZWF0ZUtleSA9IGdldENyZWF0ZUtleUZuKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGxpc3Q6IFRbXSA9IFtdKSB7XHJcbiAgICB0aGlzLl9saXN0ID0gbGlzdC5tYXAodGhpcy5jb252ZXJ0KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29udmVydCA9IChpdGVtOiBUKSA9PiB7XHJcbiAgICByZXR1cm4geyBrZXk6IHRoaXMuX2NyZWF0ZUtleSgpLCB2YWx1ZTogaXRlbSB9XHJcbiAgfVxyXG5cclxuICBnZXQgbGlzdCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9saXN0O1xyXG4gIH1cclxuXHJcbiAgZ2V0IGxlbmd0aCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9saXN0Lmxlbmd0aDtcclxuICB9XHJcblxyXG4gIHJlbmRlcihmbjogKHZhbHVlOiBULCBrZXk6IG51bWJlcikgPT4gYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbGlzdC5tYXAoKHsga2V5LCB2YWx1ZSB9KSA9PiBmbih2YWx1ZSwga2V5KSk7XHJcbiAgfVxyXG5cclxuICBtYXAoZm46ICh2YWx1ZTogVCkgPT4gYW55KSB7XHJcbiAgICB0aGlzLl9saXN0ID0gdGhpcy5fbGlzdC5tYXAoKHsga2V5LCB2YWx1ZSB9KSA9PiAoeyBrZXksIHZhbHVlOiBmbih2YWx1ZSkgfSkpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBhZGQoLi4ubmV3SXRlbXM6IFRbXSkge1xyXG4gICAgdGhpcy5fbGlzdCA9IFsuLi50aGlzLl9saXN0LCAuLi5uZXdJdGVtcy5tYXAodGhpcy5jb252ZXJ0KV07XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGRlbGV0ZSguLi5rZXlzOiBudW1iZXJbXSkge1xyXG4gICAgdGhpcy5fbGlzdCA9IHRoaXMuX2xpc3QuZmlsdGVyKGl0ZW0gPT4gIWtleXMuc29tZShrZXkgPT4ga2V5ID09PSBpdGVtLmtleSkpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlRm9ybUFycmF5ID0gPFQ+KGxpc3Q6IFRbXSwgbWluTGVuID0gMSkgPT4ge1xyXG5cclxuICBjb25zdCByZXN0TGVuID0gbWluTGVuIC0gbGlzdC5sZW5ndGg7XHJcblxyXG4gIHJldHVybiBuZXcgRm9ybUFycmF5KFxyXG4gICAgcmVzdExlbiA+IDAgP1xyXG4gICAgICBbLi4uZW5zdXJlQXJyYXkobGlzdCksIC4uLkFycmF5KHJlc3RMZW4pXSA6XHJcbiAgICAgIGVuc3VyZUFycmF5KGxpc3QpXHJcbiAgKTtcclxufVxyXG4iXX0=
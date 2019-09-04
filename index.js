"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** 获取创建自增key的方法 */
var getCreateKeyFn = function () { var i = 0; return function () { return i++; }; };
/** 确保是数组 */
var ensureArray = function (arr) { return arr instanceof Array ? arr : []; };
/** 克隆新的对象是为了在PureComponent中执行render */
var cloneFormArray = function (formArray) {
    var fa = new FormArray();
    fa.createKey = formArray.createKey;
    return fa;
};
var FormArray = /** @class */ (function () {
    function FormArray(list) {
        if (list === void 0) { list = []; }
        var _this = this;
        /** 创建自增key */
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
    FormArray.prototype.get = function (key) {
        var item = this._list.find(function (v) { return v.key === key; });
        return item && item.value;
    };
    FormArray.prototype.set = function (key, param) {
        var fa = cloneFormArray(this);
        fa._list = this._list.map(function (v) { return v.key === key ?
            {
                key: key,
                value: typeof param === 'function' ? param(v) : param
            } :
            v; });
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
/**
 * 创建表单数组对象
 * @param list 表单数据列表
 * @param minLen 表单项最小个数
 */
exports.createFormArray = function (list, minLen) {
    if (minLen === void 0) { minLen = 0; }
    var arr = ensureArray(list);
    var restLen = minLen - arr.length;
    return new FormArray(restLen > 0 ? arr.concat(Array.from({ length: restLen })) :
        arr);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1CQUFtQjtBQUNuQixJQUFNLGNBQWMsR0FBRyxjQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sY0FBTSxPQUFBLENBQUMsRUFBRSxFQUFILENBQUcsQ0FBQSxDQUFDLENBQUMsQ0FBQztBQUU3RCxZQUFZO0FBQ1osSUFBTSxXQUFXLEdBQUcsVUFBSSxHQUFRLElBQVUsT0FBQSxHQUFHLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBL0IsQ0FBK0IsQ0FBQztBQUUxRSx1Q0FBdUM7QUFDdkMsSUFBTSxjQUFjLEdBQUcsVUFBSSxTQUF1QjtJQUNoRCxJQUFNLEVBQUUsR0FBRyxJQUFJLFNBQVMsRUFBSyxDQUFDO0lBQzlCLEVBQUUsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztJQUNuQyxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUMsQ0FBQztBQUVGO0lBT0UsbUJBQVksSUFBYztRQUFkLHFCQUFBLEVBQUEsU0FBYztRQUExQixpQkFFQztRQUxELGNBQWM7UUFDZCxjQUFTLEdBQUcsY0FBYyxFQUFFLENBQUM7UUFNckIsWUFBTyxHQUFHLFVBQUMsSUFBTztZQUN4QixPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUE7UUFDL0MsQ0FBQyxDQUFBO1FBTEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBTUQsc0JBQUksMkJBQUk7YUFBUjtZQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxF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SUFDWixDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDLEFBeEVELElBd0VDO0FBeEVZLDhCQUFTO0FBMEV0Qjs7OztHQUlHO0FBQ1UsUUFBQSxlQUFlLEdBQUcsVUFBSSxJQUFTLEVBQUUsTUFBVTtJQUFWLHVCQUFBLEVBQUEsVUFBVTtJQUV0RCxJQUFNLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFOUIsSUFBTSxPQUFPLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFFcEMsT0FBTyxJQUFJLFNBQVMsQ0FDbEIsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQ1AsR0FBRyxRQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQVEsRUFBRSxDQUFDO1FBQ3JELEdBQUcsQ0FDTixDQUFDO0FBQ0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIOiOt+WPluWIm+W7uuiHquWinmtleeeahOaWueazlSAqL1xyXG5jb25zdCBnZXRDcmVhdGVLZXlGbiA9ICgpID0+IHsgbGV0IGkgPSAwOyByZXR1cm4gKCkgPT4gaSsrIH07XHJcblxyXG4vKiog56Gu5L+d5piv5pWw57uEICovXHJcbmNvbnN0IGVuc3VyZUFycmF5ID0gPFQ+KGFycjogVFtdKTogVFtdID0+IGFyciBpbnN0YW5jZW9mIEFycmF5ID8gYXJyIDogW107XHJcblxyXG4vKiog5YWL6ZqG5paw55qE5a+56LGh5piv5Li65LqG5ZyoUHVyZUNvbXBvbmVudOS4reaJp+ihjHJlbmRlciAqL1xyXG5jb25zdCBjbG9uZUZvcm1BcnJheSA9IDxUPihmb3JtQXJyYXk6IEZvcm1BcnJheTxUPikgPT4ge1xyXG4gIGNvbnN0IGZhID0gbmV3IEZvcm1BcnJheTxUPigpO1xyXG4gIGZhLmNyZWF0ZUtleSA9IGZvcm1BcnJheS5jcmVhdGVLZXk7XHJcbiAgcmV0dXJuIGZhO1xyXG59O1xyXG5cclxuZXhwb3J0IGNsYXNzIEZvcm1BcnJheTxUPiB7XHJcblxyXG4gIF9saXN0OiBBcnJheTx7IGtleTogbnVtYmVyOyB2YWx1ZTogVDsgfT47XHJcblxyXG4gIC8qKiDliJvlu7roh6rlop5rZXkgKi9cclxuICBjcmVhdGVLZXkgPSBnZXRDcmVhdGVLZXlGbigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihsaXN0OiBUW10gPSBbXSkge1xyXG4gICAgdGhpcy5fbGlzdCA9IGxpc3QubWFwKHRoaXMuY29udmVydCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbnZlcnQgPSAoaXRlbTogVCkgPT4ge1xyXG4gICAgcmV0dXJuIHsga2V5OiB0aGlzLmNyZWF0ZUtleSgpLCB2YWx1ZTogaXRlbSB9XHJcbiAgfVxyXG5cclxuICBnZXQgbGlzdCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9saXN0Lm1hcCh2ID0+IHYudmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGxlbmd0aCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9saXN0Lmxlbmd0aDtcclxuICB9XHJcblxyXG4gIHJlbmRlcihmbjogKHZhbHVlOiBULCBrZXk6IG51bWJlciwgaW5kZXg6IG51bWJlcikgPT4gYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbGlzdC5tYXAoKHsga2V5LCB2YWx1ZSB9LCBpbmRleCkgPT4gZm4odmFsdWUsIGtleSwgaW5kZXgpKTtcclxuICB9XHJcblxyXG4gIG1hcDxOPihmbjogKHZhbHVlOiBUKSA9PiBOKTogRm9ybUFycmF5PE4+IHtcclxuICAgIGNvbnN0IGZhID0gbmV3IEZvcm1BcnJheTxOPigpO1xyXG4gICAgZmEuY3JlYXRlS2V5ID0gdGhpcy5jcmVhdGVLZXk7XHJcblxyXG4gICAgZmEuX2xpc3QgPSB0aGlzLl9saXN0Lm1hcCgoeyBrZXksIHZhbHVlIH0pID0+ICh7IGtleSwgdmFsdWU6IGZuKHZhbHVlKSB9KSk7XHJcblxyXG4gICAgcmV0dXJuIGZhO1xyXG4gIH1cclxuXHJcbiAgZ2V0KGtleTogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBpdGVtID0gdGhpcy5fbGlzdC5maW5kKHYgPT4gdi5rZXkgPT09IGtleSk7XHJcbiAgICByZXR1cm4gaXRlbSAmJiBpdGVtLnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgc2V0KGtleTogbnVtYmVyLCBpdGVtOiBUKTogRm9ybUFycmF5PFQ+O1xyXG4gIHNldChrZXk6IG51bWJlciwgZm46IChpdGVtOiBUKSA9PiBUKTogRm9ybUFycmF5PFQ+O1xyXG4gIHNldChrZXk6IG51bWJlciwgcGFyYW06IGFueSk6IEZvcm1BcnJheTxUPiB7XHJcbiAgICBjb25zdCBmYSA9IGNsb25lRm9ybUFycmF5KHRoaXMpO1xyXG5cclxuICAgIGZhLl9saXN0ID0gdGhpcy5fbGlzdC5tYXAodiA9PiB2LmtleSA9PT0ga2V5ID9cclxuICAgICAge1xyXG4gICAgICAgIGtleSxcclxuICAgICAgICB2YWx1ZTogdHlwZW9mIHBhcmFtID09PSAnZnVuY3Rpb24nID8gcGFyYW0odikgOiBwYXJhbVxyXG4gICAgICB9IDpcclxuICAgICAgdlxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gZmE7XHJcbiAgfVxyXG5cclxuICBhZGQoLi4ubmV3SXRlbXM6IFRbXSk6IEZvcm1BcnJheTxUPiB7XHJcbiAgICBjb25zdCBmYSA9IGNsb25lRm9ybUFycmF5KHRoaXMpO1xyXG5cclxuICAgIGZhLl9saXN0ID0gWy4uLnRoaXMuX2xpc3QsIC4uLm5ld0l0ZW1zLm1hcCh0aGlzLmNvbnZlcnQpXTtcclxuXHJcbiAgICByZXR1cm4gZmE7XHJcbiAgfVxyXG5cclxuICBkZWxldGUoLi4ua2V5czogbnVtYmVyW10pOiBGb3JtQXJyYXk8VD4ge1xyXG4gICAgY29uc3QgZmEgPSBjbG9uZUZvcm1BcnJheSh0aGlzKTtcclxuXHJcbiAgICBmYS5fbGlzdCA9IHRoaXMuX2xpc3QuZmlsdGVyKGl0ZW0gPT4gIWtleXMuc29tZShrZXkgPT4ga2V5ID09PSBpdGVtLmtleSkpO1xyXG5cclxuICAgIHJldHVybiBmYTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDliJvlu7rooajljZXmlbDnu4Tlr7nosaFcclxuICogQHBhcmFtIGxpc3Qg6KGo5Y2V5pWw5o2u5YiX6KGoXHJcbiAqIEBwYXJhbSBtaW5MZW4g6KGo5Y2V6aG55pyA5bCP5Liq5pWwXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY3JlYXRlRm9ybUFycmF5ID0gPFQ+KGxpc3Q6IFRbXSwgbWluTGVuID0gMCkgPT4ge1xyXG5cclxuICBjb25zdCBhcnIgPSBlbnN1cmVBcnJheShsaXN0KTtcclxuXHJcbiAgY29uc3QgcmVzdExlbiA9IG1pbkxlbiAtIGFyci5sZW5ndGg7XHJcblxyXG4gIHJldHVybiBuZXcgRm9ybUFycmF5KFxyXG4gICAgcmVzdExlbiA+IDAgP1xyXG4gICAgICBbLi4uYXJyLCAuLi5BcnJheS5mcm9tKHsgbGVuZ3RoOiByZXN0TGVuIH0pIGFzIFRbXV0gOlxyXG4gICAgICBhcnJcclxuICApO1xyXG59XHJcbiJdfQ==
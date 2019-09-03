"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** 创建自增key */
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
    FormArray.prototype.set = function (key, item) {
        var fa = cloneFormArray(this);
        fa._list = this._list.map(function (v) { return v.key === key ? { key: key, value: item } : v; });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGNBQWM7QUFDZCxJQUFNLGNBQWMsR0FBRyxjQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sY0FBTSxPQUFBLENBQUMsRUFBRSxFQUFILENBQUcsQ0FBQSxDQUFDLENBQUMsQ0FBQztBQUU3RCxZQUFZO0FBQ1osSUFBTSxXQUFXLEdBQUcsVUFBSSxHQUFRLElBQVUsT0FBQSxHQUFHLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBL0IsQ0FBK0IsQ0FBQztBQUUxRSx1Q0FBdUM7QUFDdkMsSUFBTSxjQUFjLEdBQUcsVUFBSSxTQUF1QjtJQUNoRCxJQUFNLEVBQUUsR0FBRyxJQUFJLFNBQVMsRUFBSyxDQUFDO0lBQzlCLEVBQUUsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztJQUNuQyxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUMsQ0FBQztBQUVGO0lBS0UsbUJBQVksSUFBYztRQUFkLHFCQUFBLEVBQUEsU0FBYztRQUExQixpQkFFQztRQUpELGNBQVMsR0FBRyxjQUFjLEVBQUUsQ0FBQztRQU1yQixZQUFPLEdBQUcsVUFBQyxJQUFPO1lBQ3hCLE9BQU8sRUFBRSxHQUFHLEVBQUUsS0FBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQTtRQUMvQyxDQUFDLENBQUE7UUFMQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFNRCxzQkFBSSwyQkFBSTthQUFSO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxLQUFLLEVBQVAsQ0FBTyxDQUFDLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSw2QkFBTTthQUFWO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUVELDBCQUFNLEdBQU4sVUFBTyxFQUFpRDtRQUN0RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsRUFBYyxFQUFFLEtBQUs7Z0JBQW5CLFlBQUcsRUFBRSxnQkFBSztZQUFjLE9BQUEsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDO1FBQXJCLENBQXFCLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsdUJBQUcsR0FBSCxVQUFPLEVBQW1CO1FBQ3hCLElBQU0sRUFBRSxHQUFHLElBQUksU0FBUyxFQUFLLENBQUM7UUFDOUIsRUFBRSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRTlCLEVBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQyxFQUFjO2dCQUFaLFlBQUcsRUFBRSxnQkFBSztZQUFPLE9BQUEsQ0FBQyxFQUFFLEdBQUcsS0FBQSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUEzQixDQUEyQixDQUFDLENBQUM7UUFFM0UsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQsdUJBQUcsR0FBSCxVQUFJLEdBQVc7UUFDYixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFiLENBQWEsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUVELHVCQUFHLEdBQUgsVUFBSSxHQUFXLEVBQUUsSUFBTztRQUN0QixJQUFNLEVBQUUsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEMsRUFBRSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsS0FBQSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUF4QyxDQUF3QyxDQUFDLENBQUM7UUFFekUsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQsdUJBQUcsR0FBSDtRQUFJLGtCQUFnQjthQUFoQixVQUFnQixFQUFoQixxQkFBZ0IsRUFBaEIsSUFBZ0I7WUFBaEIsNkJBQWdCOztRQUNsQixJQUFNLEVBQUUsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEMsRUFBRSxDQUFDLEtBQUssR0FBTyxJQUFJLENBQUMsS0FBSyxRQUFLLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFMUQsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQsMEJBQU0sR0FBTjtRQUFPLGNBQWlCO2FBQWpCLFVBQWlCLEVBQWpCLHFCQUFpQixFQUFqQixJQUFpQjtZQUFqQix5QkFBaUI7O1FBQ3RCLElBQU0sRUFBRSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoQyxFQUFFLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQWhCLENBQWdCLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQyxDQUFDO1FBRTFFLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUNILGdCQUFDO0FBQUQsQ0FBQyxBQTlERCxJQThEQztBQTlEWSw4QkFBUztBQWdFVCxRQUFBLGVBQWUsR0FBRyxVQUFJLElBQVMsRUFBRSxNQUFVO0lBQVYsdUJBQUEsRUFBQSxVQUFVO0lBRXRELElBQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU5QixJQUFNLE9BQU8sR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUVwQyxPQUFPLElBQUksU0FBUyxDQUNsQixPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FDUCxHQUFHLFFBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBUSxFQUFFLENBQUM7UUFDckQsR0FBRyxDQUNOLENBQUM7QUFDSixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiog5Yib5bu66Ieq5aKea2V5ICovXHJcbmNvbnN0IGdldENyZWF0ZUtleUZuID0gKCkgPT4geyBsZXQgaSA9IDA7IHJldHVybiAoKSA9PiBpKysgfTtcclxuXHJcbi8qKiDnoa7kv53mmK/mlbDnu4QgKi9cclxuY29uc3QgZW5zdXJlQXJyYXkgPSA8VD4oYXJyOiBUW10pOiBUW10gPT4gYXJyIGluc3RhbmNlb2YgQXJyYXkgPyBhcnIgOiBbXTtcclxuXHJcbi8qKiDlhYvpmobmlrDnmoTlr7nosaHmmK/kuLrkuoblnKhQdXJlQ29tcG9uZW505Lit5omn6KGMcmVuZGVyICovXHJcbmNvbnN0IGNsb25lRm9ybUFycmF5ID0gPFQ+KGZvcm1BcnJheTogRm9ybUFycmF5PFQ+KSA9PiB7XHJcbiAgY29uc3QgZmEgPSBuZXcgRm9ybUFycmF5PFQ+KCk7XHJcbiAgZmEuY3JlYXRlS2V5ID0gZm9ybUFycmF5LmNyZWF0ZUtleTtcclxuICByZXR1cm4gZmE7XHJcbn07XHJcblxyXG5leHBvcnQgY2xhc3MgRm9ybUFycmF5PFQ+IHtcclxuXHJcbiAgX2xpc3Q6IEFycmF5PHsga2V5OiBudW1iZXI7IHZhbHVlOiBUOyB9PjtcclxuICBjcmVhdGVLZXkgPSBnZXRDcmVhdGVLZXlGbigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihsaXN0OiBUW10gPSBbXSkge1xyXG4gICAgdGhpcy5fbGlzdCA9IGxpc3QubWFwKHRoaXMuY29udmVydCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbnZlcnQgPSAoaXRlbTogVCkgPT4ge1xyXG4gICAgcmV0dXJuIHsga2V5OiB0aGlzLmNyZWF0ZUtleSgpLCB2YWx1ZTogaXRlbSB9XHJcbiAgfVxyXG5cclxuICBnZXQgbGlzdCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9saXN0Lm1hcCh2ID0+IHYudmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGxlbmd0aCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9saXN0Lmxlbmd0aDtcclxuICB9XHJcblxyXG4gIHJlbmRlcihmbjogKHZhbHVlOiBULCBrZXk6IG51bWJlciwgaW5kZXg6IG51bWJlcikgPT4gYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbGlzdC5tYXAoKHsga2V5LCB2YWx1ZSB9LCBpbmRleCkgPT4gZm4odmFsdWUsIGtleSwgaW5kZXgpKTtcclxuICB9XHJcblxyXG4gIG1hcDxOPihmbjogKHZhbHVlOiBUKSA9PiBOKTogRm9ybUFycmF5PE4+IHtcclxuICAgIGNvbnN0IGZhID0gbmV3IEZvcm1BcnJheTxOPigpO1xyXG4gICAgZmEuY3JlYXRlS2V5ID0gdGhpcy5jcmVhdGVLZXk7XHJcblxyXG4gICAgZmEuX2xpc3QgPSB0aGlzLl9saXN0Lm1hcCgoeyBrZXksIHZhbHVlIH0pID0+ICh7IGtleSwgdmFsdWU6IGZuKHZhbHVlKSB9KSk7XHJcblxyXG4gICAgcmV0dXJuIGZhO1xyXG4gIH1cclxuXHJcbiAgZ2V0KGtleTogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBpdGVtID0gdGhpcy5fbGlzdC5maW5kKHYgPT4gdi5rZXkgPT09IGtleSk7XHJcbiAgICByZXR1cm4gaXRlbSAmJiBpdGVtLnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgc2V0KGtleTogbnVtYmVyLCBpdGVtOiBUKTogRm9ybUFycmF5PFQ+IHtcclxuICAgIGNvbnN0IGZhID0gY2xvbmVGb3JtQXJyYXkodGhpcyk7XHJcblxyXG4gICAgZmEuX2xpc3QgPSB0aGlzLl9saXN0Lm1hcCh2ID0+IHYua2V5ID09PSBrZXkgPyB7IGtleSwgdmFsdWU6IGl0ZW0gfSA6IHYpO1xyXG5cclxuICAgIHJldHVybiBmYTtcclxuICB9XHJcblxyXG4gIGFkZCguLi5uZXdJdGVtczogVFtdKTogRm9ybUFycmF5PFQ+IHtcclxuICAgIGNvbnN0IGZhID0gY2xvbmVGb3JtQXJyYXkodGhpcyk7XHJcblxyXG4gICAgZmEuX2xpc3QgPSBbLi4udGhpcy5fbGlzdCwgLi4ubmV3SXRlbXMubWFwKHRoaXMuY29udmVydCldO1xyXG5cclxuICAgIHJldHVybiBmYTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZSguLi5rZXlzOiBudW1iZXJbXSk6IEZvcm1BcnJheTxUPiB7XHJcbiAgICBjb25zdCBmYSA9IGNsb25lRm9ybUFycmF5KHRoaXMpO1xyXG5cclxuICAgIGZhLl9saXN0ID0gdGhpcy5fbGlzdC5maWx0ZXIoaXRlbSA9PiAha2V5cy5zb21lKGtleSA9PiBrZXkgPT09IGl0ZW0ua2V5KSk7XHJcblxyXG4gICAgcmV0dXJuIGZhO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUZvcm1BcnJheSA9IDxUPihsaXN0OiBUW10sIG1pbkxlbiA9IDApID0+IHtcclxuXHJcbiAgY29uc3QgYXJyID0gZW5zdXJlQXJyYXkobGlzdCk7XHJcblxyXG4gIGNvbnN0IHJlc3RMZW4gPSBtaW5MZW4gLSBhcnIubGVuZ3RoO1xyXG5cclxuICByZXR1cm4gbmV3IEZvcm1BcnJheShcclxuICAgIHJlc3RMZW4gPiAwID9cclxuICAgICAgWy4uLmFyciwgLi4uQXJyYXkuZnJvbSh7IGxlbmd0aDogcmVzdExlbiB9KSBhcyBUW11dIDpcclxuICAgICAgYXJyXHJcbiAgKTtcclxufVxyXG4iXX0=
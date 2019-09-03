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
        fa._list = this._list.map(function (v) {
            if (v.key === key) {
                return typeof param === 'function' ? param(v) : { key: key, value: param };
            }
            else {
                return v;
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1CQUFtQjtBQUNuQixJQUFNLGNBQWMsR0FBRyxjQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sY0FBTSxPQUFBLENBQUMsRUFBRSxFQUFILENBQUcsQ0FBQSxDQUFDLENBQUMsQ0FBQztBQUU3RCxZQUFZO0FBQ1osSUFBTSxXQUFXLEdBQUcsVUFBSSxHQUFRLElBQVUsT0FBQSxHQUFHLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBL0IsQ0FBK0IsQ0FBQztBQUUxRSx1Q0FBdUM7QUFDdkMsSUFBTSxjQUFjLEdBQUcsVUFBSSxTQUF1QjtJQUNoRCxJQUFNLEVBQUUsR0FBRyxJQUFJLFNBQVMsRUFBSyxDQUFDO0lBQzlCLEVBQUUsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztJQUNuQyxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUMsQ0FBQztBQUVGO0lBT0UsbUJBQVksSUFBYztRQUFkLHFCQUFBLEVBQUEsU0FBYztRQUExQixpQkFFQztRQUxELGNBQWM7UUFDZCxjQUFTLEdBQUcsY0FBYyxFQUFFLENBQUM7UUFNckIsWUFBTyxHQUFHLFVBQUMsSUFBTztZQUN4QixPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUE7UUFDL0MsQ0FBQyxDQUFBO1FBTEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBTUQsc0JBQUksMkJBQUk7YUFBUjtZQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxF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QUUxRSxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUF4RUQsSUF3RUM7QUF4RVksOEJBQVM7QUEwRXRCOzs7O0dBSUc7QUFDVSxRQUFBLGVBQWUsR0FBRyxVQUFJLElBQVMsRUFBRSxNQUFVO0lBQVYsdUJBQUEsRUFBQSxVQUFVO0lBRXRELElBQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU5QixJQUFNLE9BQU8sR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUVwQyxPQUFPLElBQUksU0FBUyxDQUNsQixPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FDUCxHQUFHLFFBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBUSxFQUFFLENBQUM7UUFDckQsR0FBRyxDQUNOLENBQUM7QUFDSixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiog6I635Y+W5Yib5bu66Ieq5aKea2V555qE5pa55rOVICovXHJcbmNvbnN0IGdldENyZWF0ZUtleUZuID0gKCkgPT4geyBsZXQgaSA9IDA7IHJldHVybiAoKSA9PiBpKysgfTtcclxuXHJcbi8qKiDnoa7kv53mmK/mlbDnu4QgKi9cclxuY29uc3QgZW5zdXJlQXJyYXkgPSA8VD4oYXJyOiBUW10pOiBUW10gPT4gYXJyIGluc3RhbmNlb2YgQXJyYXkgPyBhcnIgOiBbXTtcclxuXHJcbi8qKiDlhYvpmobmlrDnmoTlr7nosaHmmK/kuLrkuoblnKhQdXJlQ29tcG9uZW505Lit5omn6KGMcmVuZGVyICovXHJcbmNvbnN0IGNsb25lRm9ybUFycmF5ID0gPFQ+KGZvcm1BcnJheTogRm9ybUFycmF5PFQ+KSA9PiB7XHJcbiAgY29uc3QgZmEgPSBuZXcgRm9ybUFycmF5PFQ+KCk7XHJcbiAgZmEuY3JlYXRlS2V5ID0gZm9ybUFycmF5LmNyZWF0ZUtleTtcclxuICByZXR1cm4gZmE7XHJcbn07XHJcblxyXG5leHBvcnQgY2xhc3MgRm9ybUFycmF5PFQ+IHtcclxuXHJcbiAgX2xpc3Q6IEFycmF5PHsga2V5OiBudW1iZXI7IHZhbHVlOiBUOyB9PjtcclxuXHJcbiAgLyoqIOWIm+W7uuiHquWinmtleSAqL1xyXG4gIGNyZWF0ZUtleSA9IGdldENyZWF0ZUtleUZuKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGxpc3Q6IFRbXSA9IFtdKSB7XHJcbiAgICB0aGlzLl9saXN0ID0gbGlzdC5tYXAodGhpcy5jb252ZXJ0KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29udmVydCA9IChpdGVtOiBUKSA9PiB7XHJcbiAgICByZXR1cm4geyBrZXk6IHRoaXMuY3JlYXRlS2V5KCksIHZhbHVlOiBpdGVtIH1cclxuICB9XHJcblxyXG4gIGdldCBsaXN0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xpc3QubWFwKHYgPT4gdi52YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXQgbGVuZ3RoKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xpc3QubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKGZuOiAodmFsdWU6IFQsIGtleTogbnVtYmVyLCBpbmRleDogbnVtYmVyKSA9PiBhbnkpIHtcclxuICAgIHJldHVybiB0aGlzLl9saXN0Lm1hcCgoeyBrZXksIHZhbHVlIH0sIGluZGV4KSA9PiBmbih2YWx1ZSwga2V5LCBpbmRleCkpO1xyXG4gIH1cclxuXHJcbiAgbWFwPE4+KGZuOiAodmFsdWU6IFQpID0+IE4pOiBGb3JtQXJyYXk8Tj4ge1xyXG4gICAgY29uc3QgZmEgPSBuZXcgRm9ybUFycmF5PE4+KCk7XHJcbiAgICBmYS5jcmVhdGVLZXkgPSB0aGlzLmNyZWF0ZUtleTtcclxuXHJcbiAgICBmYS5fbGlzdCA9IHRoaXMuX2xpc3QubWFwKCh7IGtleSwgdmFsdWUgfSkgPT4gKHsga2V5LCB2YWx1ZTogZm4odmFsdWUpIH0pKTtcclxuXHJcbiAgICByZXR1cm4gZmE7XHJcbiAgfVxyXG5cclxuICBnZXQoa2V5OiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLl9saXN0LmZpbmQodiA9PiB2LmtleSA9PT0ga2V5KTtcclxuICAgIHJldHVybiBpdGVtICYmIGl0ZW0udmFsdWU7XHJcbiAgfVxyXG5cclxuICBzZXQoa2V5OiBudW1iZXIsIGl0ZW06IFQpOiBGb3JtQXJyYXk8VD47XHJcbiAgc2V0KGtleTogbnVtYmVyLCBmbjogKGl0ZW06IFQpID0+IFQpOiBGb3JtQXJyYXk8VD47XHJcbiAgc2V0KGtleTogbnVtYmVyLCBwYXJhbTogYW55KTogRm9ybUFycmF5PFQ+IHtcclxuICAgIGNvbnN0IGZhID0gY2xvbmVGb3JtQXJyYXkodGhpcyk7XHJcblxyXG4gICAgZmEuX2xpc3QgPSB0aGlzLl9saXN0Lm1hcCh2ID0+IHtcclxuICAgICAgaWYgKHYua2V5ID09PSBrZXkpIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHBhcmFtID09PSAnZnVuY3Rpb24nID8gcGFyYW0odikgOiB7IGtleSwgdmFsdWU6IHBhcmFtIH07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHY7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBmYTtcclxuICB9XHJcblxyXG4gIGFkZCguLi5uZXdJdGVtczogVFtdKTogRm9ybUFycmF5PFQ+IHtcclxuICAgIGNvbnN0IGZhID0gY2xvbmVGb3JtQXJyYXkodGhpcyk7XHJcblxyXG4gICAgZmEuX2xpc3QgPSBbLi4udGhpcy5fbGlzdCwgLi4ubmV3SXRlbXMubWFwKHRoaXMuY29udmVydCldO1xyXG5cclxuICAgIHJldHVybiBmYTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZSguLi5rZXlzOiBudW1iZXJbXSk6IEZvcm1BcnJheTxUPiB7XHJcbiAgICBjb25zdCBmYSA9IGNsb25lRm9ybUFycmF5KHRoaXMpO1xyXG5cclxuICAgIGZhLl9saXN0ID0gdGhpcy5fbGlzdC5maWx0ZXIoaXRlbSA9PiAha2V5cy5zb21lKGtleSA9PiBrZXkgPT09IGl0ZW0ua2V5KSk7XHJcblxyXG4gICAgcmV0dXJuIGZhO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOWIm+W7uuihqOWNleaVsOe7hOWvueixoVxyXG4gKiBAcGFyYW0gbGlzdCDooajljZXmlbDmja7liJfooahcclxuICogQHBhcmFtIG1pbkxlbiDooajljZXpobnmnIDlsI/kuKrmlbBcclxuICovXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVGb3JtQXJyYXkgPSA8VD4obGlzdDogVFtdLCBtaW5MZW4gPSAwKSA9PiB7XHJcblxyXG4gIGNvbnN0IGFyciA9IGVuc3VyZUFycmF5KGxpc3QpO1xyXG5cclxuICBjb25zdCByZXN0TGVuID0gbWluTGVuIC0gYXJyLmxlbmd0aDtcclxuXHJcbiAgcmV0dXJuIG5ldyBGb3JtQXJyYXkoXHJcbiAgICByZXN0TGVuID4gMCA/XHJcbiAgICAgIFsuLi5hcnIsIC4uLkFycmF5LmZyb20oeyBsZW5ndGg6IHJlc3RMZW4gfSkgYXMgVFtdXSA6XHJcbiAgICAgIGFyclxyXG4gICk7XHJcbn1cclxuIl19
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
    var restArr = Array.from({ length: restLen < 0 ? 0 : restLen });
    return new FormArray(ensureArray(list).concat(restArr));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGNBQWM7QUFDZCxJQUFNLGNBQWMsR0FBRyxjQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sY0FBTSxPQUFBLENBQUMsRUFBRSxFQUFILENBQUcsQ0FBQSxDQUFDLENBQUMsQ0FBQztBQUU3RCxZQUFZO0FBQ1osSUFBTSxXQUFXLEdBQUcsVUFBSSxHQUFRLElBQVUsT0FBQSxHQUFHLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBL0IsQ0FBK0IsQ0FBQztBQUUxRTtJQUtFLG1CQUFZLElBQWM7UUFBZCxxQkFBQSxFQUFBLFNBQWM7UUFBMUIsaUJBRUM7UUFKTyxlQUFVLEdBQUcsY0FBYyxFQUFFLENBQUM7UUFNOUIsWUFBTyxHQUFHLFVBQUMsSUFBTztZQUN4QixPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUE7UUFDaEQsQ0FBQyxDQUFBO1FBTEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBTUQsc0JBQUksMkJBQUk7YUFBUjtZQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDZCQUFNO2FBQVY7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBRUQsMEJBQU0sR0FBTixVQUFPLEVBQWtDO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQyxFQUFjO2dCQUFaLFlBQUcsRUFBRSxnQkFBSztZQUFPLE9BQUEsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7UUFBZCxDQUFjLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsdUJBQUcsR0FBSCxVQUFJLEVBQXFCO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQyxFQUFjO2dCQUFaLFlBQUcsRUFBRSxnQkFBSztZQUFPLE9BQUEsQ0FBQyxFQUFFLEdBQUcsS0FBQSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUEzQixDQUEyQixDQUFDLENBQUM7UUFDN0UsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsdUJBQUcsR0FBSDtRQUFJLGtCQUFnQjthQUFoQixVQUFnQixFQUFoQixxQkFBZ0IsRUFBaEIsSUFBZ0I7WUFBaEIsNkJBQWdCOztRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFPLElBQUksQ0FBQyxLQUFLLFFBQUssUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM1RCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCwwQkFBTSxHQUFOO1FBQU8sY0FBaUI7YUFBakIsVUFBaUIsRUFBakIscUJBQWlCLEVBQWpCLElBQWlCO1lBQWpCLHlCQUFpQjs7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFoQixDQUFnQixDQUFDLEVBQW5DLENBQW1DLENBQUMsQ0FBQztRQUM1RSxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUF2Q0QsSUF1Q0M7QUF2Q1ksOEJBQVM7QUF5Q1QsUUFBQSxlQUFlLEdBQUcsVUFBSSxJQUFTLEVBQUUsTUFBVTtJQUFWLHVCQUFBLEVBQUEsVUFBVTtJQUN0RCxJQUFNLE9BQU8sR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQyxJQUFNLE9BQU8sR0FBUSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUV2RSxPQUFPLElBQUksU0FBUyxDQUFLLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBSyxPQUFPLEVBQUUsQ0FBQztBQUMzRCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiog5Yib5bu66Ieq5aKea2V5ICovXHJcbmNvbnN0IGdldENyZWF0ZUtleUZuID0gKCkgPT4geyBsZXQgaSA9IDA7IHJldHVybiAoKSA9PiBpKysgfTtcclxuXHJcbi8qKiDnoa7kv53mmK/mlbDnu4QgKi9cclxuY29uc3QgZW5zdXJlQXJyYXkgPSA8VD4oYXJyOiBUW10pOiBUW10gPT4gYXJyIGluc3RhbmNlb2YgQXJyYXkgPyBhcnIgOiBbXTtcclxuXHJcbmV4cG9ydCBjbGFzcyBGb3JtQXJyYXk8VD4ge1xyXG5cclxuICBwcml2YXRlIF9saXN0OiBBcnJheTx7IGtleTogbnVtYmVyOyB2YWx1ZTogVDsgfT47XHJcbiAgcHJpdmF0ZSBfY3JlYXRlS2V5ID0gZ2V0Q3JlYXRlS2V5Rm4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IobGlzdDogVFtdID0gW10pIHtcclxuICAgIHRoaXMuX2xpc3QgPSBsaXN0Lm1hcCh0aGlzLmNvbnZlcnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb252ZXJ0ID0gKGl0ZW06IFQpID0+IHtcclxuICAgIHJldHVybiB7IGtleTogdGhpcy5fY3JlYXRlS2V5KCksIHZhbHVlOiBpdGVtIH1cclxuICB9XHJcblxyXG4gIGdldCBsaXN0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xpc3Q7XHJcbiAgfVxyXG5cclxuICBnZXQgbGVuZ3RoKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xpc3QubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKGZuOiAodmFsdWU6IFQsIGtleTogbnVtYmVyKSA9PiBhbnkpIHtcclxuICAgIHJldHVybiB0aGlzLl9saXN0Lm1hcCgoeyBrZXksIHZhbHVlIH0pID0+IGZuKHZhbHVlLCBrZXkpKTtcclxuICB9XHJcblxyXG4gIG1hcChmbjogKHZhbHVlOiBUKSA9PiBhbnkpIHtcclxuICAgIHRoaXMuX2xpc3QgPSB0aGlzLl9saXN0Lm1hcCgoeyBrZXksIHZhbHVlIH0pID0+ICh7IGtleSwgdmFsdWU6IGZuKHZhbHVlKSB9KSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGFkZCguLi5uZXdJdGVtczogVFtdKSB7XHJcbiAgICB0aGlzLl9saXN0ID0gWy4uLnRoaXMuX2xpc3QsIC4uLm5ld0l0ZW1zLm1hcCh0aGlzLmNvbnZlcnQpXTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlKC4uLmtleXM6IG51bWJlcltdKSB7XHJcbiAgICB0aGlzLl9saXN0ID0gdGhpcy5fbGlzdC5maWx0ZXIoaXRlbSA9PiAha2V5cy5zb21lKGtleSA9PiBrZXkgPT09IGl0ZW0ua2V5KSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVGb3JtQXJyYXkgPSA8VD4obGlzdDogVFtdLCBtaW5MZW4gPSAxKSA9PiB7XHJcbiAgY29uc3QgcmVzdExlbiA9IG1pbkxlbiAtIGxpc3QubGVuZ3RoO1xyXG4gIGNvbnN0IHJlc3RBcnI6IFRbXSA9IEFycmF5LmZyb20oeyBsZW5ndGg6IHJlc3RMZW4gPCAwID8gMCA6IHJlc3RMZW4gfSk7XHJcblxyXG4gIHJldHVybiBuZXcgRm9ybUFycmF5KFsuLi5lbnN1cmVBcnJheShsaXN0KSwgLi4ucmVzdEFycl0pO1xyXG59XHJcbiJdfQ==
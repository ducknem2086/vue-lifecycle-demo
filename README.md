# Vue 3 Component Lifecycle

### 1. `setup()`

- Chạy **trước khi component được tạo và render**
- Là nơi khai báo logic với Composition API (reactive, ref, computed...)
- Không thể truy cập DOM hoặc `this` tại đây
- p/s : có 2 cách viết hàm setup này với trường hợp viết hết css và js ở trong 1 file component.vue:

    ```ts
    <script>
     setup(){
     }
    </script>
      và
    <script setup></script>

---

### 2. `onBeforeMount()`

- Chạy **sau setup** (phần code js được load), ngay **trước khi DOM được mount**
- DOM chưa được render ra trình duyệt

---

### 3. `onMounted()`

- Sau khi component đã được **render vào DOM**

---

### 4. `onBeforeUpdate()`

- Chạy **trước khi DOM được cập nhật** do dữ liệu thay đổi
- Có thể dùng để kiểm tra hoặc hủy logic nếu cần

---

### 5. `onUpdated()`

- Chạy **sau khi DOM đã được cập nhật**
- Thích hợp để xử lý logic phụ thuộc vào DOM mới

---

### 6. `onBeforeUnmount()`

- Gọi **trước khi component bị gỡ khỏi cây DOM**
- Có thể dùng để dọn dẹp: remove event listener, clearInterval, cancel request...

---

### 7. `onUnmounted()`

- Component đã bị **xóa khỏi cây DOM**
- Xác nhận hoàn tất việc gỡ bỏ

---

## Ghi chú:

- Các lifecycle hook đều được dùng bên trong `setup()` dưới dạng hàm:
  ```ts
  import { onMounted, onUnmounted } from 'vue';

  setup() {
    onMounted(() => {
      console.log('Component đã mount');
    });

    onUnmounted(() => {
      console.log('Component đã bị hủy');
    });
  }

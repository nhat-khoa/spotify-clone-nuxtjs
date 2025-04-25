// plugins/sortable.client.ts
import { Sortable, MultiDrag } from "sortablejs";

export default defineNuxtPlugin(() => {
  // Mount plugin nếu chưa mount
  Sortable.mount(new MultiDrag());
  return {
    provide: {
      sortable: Sortable,
    },
  }
})

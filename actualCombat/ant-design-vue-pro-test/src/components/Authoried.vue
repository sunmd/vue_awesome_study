<script>
import { check } from "../utils/auth";
export default {
  functional: true,
  props: {
    authority: {
      type: Array,
      requred: true
    }
  },
  render(h, context) {
    const { props, scopedSlots } = context;
    console.log(check(props.authority));
    return check(props.authority) ? scopedSlots.default() : null;
  }
};
</script>

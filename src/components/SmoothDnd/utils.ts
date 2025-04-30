// 用于处理 Vue 组件动态标签(tag)属性的工具函数，主要功能是根据传入的上下文和可选类名，生成适合用于动态组件或渲染函数的标签属性对象
export function getTagProps(ctx: any, tagClass?: string) {
  const tag = ctx.$props.tag;
  if (tag) {
    if (typeof tag === "string") {
      const result: any = { value: tag };
      if (tagClass) {
        result.props = { class: tagClass };
      }
      return result;
    } else if (typeof tag === "object") {
      const result = { value: tag.value || "div", props: tag.props || {} };
      if (tagClass) {
        if (result.props.class) {
          if (Array.isArray(result.props.class)) {
            result.props.class.push(tagClass);
          } else {
            result.props.class = [tagClass, result.props.class];
          }
        } else {
          result.props.class = tagClass;
        }
      }
      return result;
    }
  }
  return { value: "div" };
}
export function validateTagProp(tag?: Ref) {
  if (tag) {
    if (typeof tag === "string") return true;
    if (typeof tag === "object") {
      if (
        typeof tag.value === "string" ||
        typeof tag.value === "function" ||
        typeof tag.value === "object"
      ) {
        return true;
      }
    }
    return false;
  }
  return true;
}

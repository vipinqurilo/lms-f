import toast from "react-hot-toast";

const toastMiddleware = (store) => (next) => (action) => {
  const requestMethod = action?.type;

  if (requestMethod.split("/")?.[0] === "GET") {
    return next(action);
  }
  if (action.type.endsWith("/fulfilled")) {
    const { payload } = action;
    if (payload?.message) {
      toast.success(payload.message);
    }
  } else if (action.type.endsWith("/rejected")) {
    const { error } = action;
    toast.error(error?.message || "An error occurred");
  }
  return next(action);
};

export default toastMiddleware;

import toast from "react-hot-toast";

const toastMiddleware = (store) => (next) => (action) => {
  const requestMethod = action?.type;

  if (requestMethod.split("/")?.[0] === "GET") {
    return next(action);
  }
  if (action.type.endsWith("/fulfilled")) {
    const { payload } = action;
    if (payload?.message && payload?.status === "success") {
      toast.success(payload.message);
    } else {
      toast.error(payload?.message);
    }
  } else if (action.type.endsWith("/rejected")) {
    const { payload, error } = action;
    const errorMessage = payload || error?.message || "An error occurred";
    toast.error(errorMessage);
  }
  return next(action);
};

export default toastMiddleware;

import toast from "react-hot-toast";

const toastMiddleware = (store) => (next) => (action) => {
  if (action) {
    const requestMethod = action?.type;

    if (requestMethod.split("/")?.[0] === "GET") {
      return next(action);
    }
    if (action.type.endsWith("/fulfilled")) {
      const { payload } = action;
      if (
        payload?.message &&
        payload?.status !== "error" &&
        payload.status !== "failed"
      ) {
        toast.success(payload.message);
      } else if (payload?.message) {
        toast.error(payload?.message || "an error");
      }
    } else if (action.type.endsWith("/rejected")) {
      const { payload, error } = action;
      const errorMessage = payload || error?.message || "An error occurred";
      if (payload || error?.message) {
        toast.error(errorMessage);
      }
    }
  }

  return next(action);
};

export default toastMiddleware;




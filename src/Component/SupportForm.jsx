import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

const API_BASE = "https://ec-course-api.hexschool.io/v2";
const API_PATH = "mevius";
function SupportForm({ setLoading }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      email: "",
      name: "",
      tel: "",
      address: "",
      message: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/api/${API_PATH}/order`, {
        data: {
          user: {
            name: data.name,
            email: data.email,
            tel: data.tel,
            address: data.address,
          },
          message: data.message,
        },
      });
      console.log(res.data.orderId);
      await orderPaid(res.data.orderId);
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
      });
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  const orderPaid = async (orderId) => {
    try {
      await axios.post(`${API_BASE}/api/${API_PATH}/pay/${orderId}`);
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
      });
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      toast.success("訂單已送出", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
      });
      reset({ email: "", name: "", tel: "", address: "", message: "" });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="form-wrapper">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-fields">
          <div className="floating">
            <div className="floating__inner">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "此欄位必填",
                  },
                  pattern: {
                    value: /^\S+@\S+\.\S+$/i,
                    message: "請輸入正確的 Email 格式",
                  },
                })}
                className={errors.email ? "error_auth-input" : "auth-input"}
                placeholder="請輸入 Email"
              />
              {errors.email && (
                <div className="invalid-hint">{errors?.email?.message}</div>
              )}
            </div>

            <div className="floating__inner">
              <label htmlFor="name" className="form-label">
                姓名
              </label>
              <input
                id="name"
                name="姓名"
                type="text"
                {...register("name", {
                  required: {
                    value: true,
                    message: "此欄位位必填",
                  },
                  minLength: {
                    value: 2,
                    message: "請輸入至少2個字",
                  },
                  maxLength: {
                    value: 20,
                    message: "請勿超過20個字",
                  },
                })}
                className={errors.name ? "error_auth-input" : "auth-input"}
                placeholder="請輸入姓名"
              />
              {errors.name && (
                <div className="invalid-hint">{errors?.name?.message}</div>
              )}
            </div>

            <div className="floating__inner">
              <label htmlFor="tel" className="form-label">
                電話
              </label>
              <input
                id="tel"
                name="電話"
                type="text"
                {...register("tel", {
                  required: {
                    value: true,
                    message: "此欄位必填",
                  },
                  pattern: {
                    value: /^09\d{8}$|^09\d{2}-\d{3}-\d{3}$/,
                    message: "請輸入正確的手機格式",
                  },
                })}
                className={errors.tel ? "error_auth-input" : "auth-input"}
                placeholder="請輸入電話"
              />
              {errors.tel && (
                <div className="invalid-hint">{errors?.tel?.message}</div>
              )}
            </div>

            <div className="floating__inner">
              <label htmlFor="address" className="form-label">
                地址
              </label>
              <input
                id="address"
                name="地址"
                type="text"
                {...register("address", {
                  required: {
                    value: true,
                    message: "此欄位位必填",
                  },
                  minLength: {
                    value: 5,
                    message: "請輸入至少5個字",
                  },
                  maxLength: {
                    value: 150,
                    message: "請勿超過150個字",
                  },
                })}
                className={errors.address ? "error_auth-input" : "auth-input"}
                placeholder="請輸入地址"
              />
              {errors.address && (
                <div className="invalid-hint">{errors?.address?.message}</div>
              )}
            </div>

            <div className="floating__inner">
              <label htmlFor="message" className="form-label">
                留言
              </label>
              <textarea
                id="message"
                className="form-control"
                {...register("message", {
                  maxLength: {
                    value: 300,
                    message: "請勿超過300個字",
                  },
                })}
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="form-submit-btn">
              <button
                type="submit"
                className="btn form-btn-submit"
                // disabled={cartProductData.length === 0}
              >
                送出訂單
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

SupportForm.propTypes = {
  setLoading: PropTypes.func.isRequired,
  cartChanged: PropTypes.bool.isRequired,
  setCartChanged: PropTypes.func.isRequired,
  cartProductData: PropTypes.array.isRequired,
  watch: PropTypes.func.isRequired,
};
export default SupportForm;

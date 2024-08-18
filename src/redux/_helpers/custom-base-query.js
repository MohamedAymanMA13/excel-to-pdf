import axios from 'axios'
import store from 'redux/store/index'
import { loadingCounter, handleCatchError } from 'redux/store/actions'

// const toast = createStandaloneToast()

export const axiosBaseQuery = ({ baseUrl = `${process.env.REACT_APP_API_KEY}/` }) => {
  return async ({ url, params, method, body, headers }) => {
    try {
      // Add a request interceptor
      axios.interceptors.request.use(
        function (config) {
          // Do something before request is sent
          // console.log(url, 'request')
          store.dispatch(loadingCounter(1))
          return config
        },
        function (error) {
          // Do something with request error
          // console.log(url, 'request error')
          store.dispatch(loadingCounter(1))
          return Promise.reject(error)
        },
      )
      // Add a response interceptor
      axios.interceptors.response.use(
        function (response) {
          // Any status code that lie within the range of 2xx cause this function to trigger
          // Do something with response data
          // console.log(url, 'response ')
          store.dispatch(loadingCounter(-1))
          return response
        },
        function (error) {
          // Any status codes that falls outside the range of 2xx cause this function to trigger
          // Do something with response error
          store.dispatch(loadingCounter(-1))
          // console.log(url, 'response error')
          return Promise.reject(error)
        },
      )
      const result = await axios({
        url: baseUrl + url,
        method,
        ...(params && { params }),
        ...(headers && { headers }),
        ...(body && { data: body }),
      })
      return {
        data: result.data,
      }
    } catch (axiosError) {
      const err = axiosError
      return {
        error: err,
      }
    }
  }
}
const baseQuery = axiosBaseQuery(process.env.REACT_APP_API_KEY)

export const baseQueryWithErrorHandler = async args => {
  const result = await baseQuery(args)
  if (result?.error) {
    store.dispatch(handleCatchError(result.error))
  }
  return result
}

// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { authHeaderAPI } from 'redux/_helpers/auth-header'
import axios from 'axios'
import { handleCatchError, loadingCounter, errorMes, alertSuccessMes } from 'redux/store/actions'

// const toast = createStandaloneToast()

// const baseQuery = fetchBaseQuery({
//   baseUrl: process.env.REACT_APP_API_KEY,
//   prepareHeaders: headers => {
//     const user = JSON.parse(localStorage.getItem('userNexus'))
//     const Lang = localStorage.getItem('Lang')
//     if (user && user.accessToken) {
//       headers.set('Authorization', `Bearer ${user.accessToken}`)
//     }
//     headers.set('Lang', Lang || 'EN')
//     return headers
//   },
// })
// export const baseQueryWithErrorHandler = async (args, api, extraOptions) => {
//   const result = await baseQuery(args, api, extraOptions)
//   // console.log({ result })

//   if (result.error) {
//     let description = ''
//     let title = ''
//     const { status, data } = result.error

//     if (status === 401) {
//       description = 'Not authorized!'
//     } else if (status === 404) {
//       description = 'Data not found!'
//     } else if (data) {
//       console.log({ data })
//       const { errors, title: errorTitle } = data
//       let errorText = []

//       if (errors) {
//         errorText = Object.entries(errors).map(ent => {
//           const [key, value] = ent

//           return `${key}: ${value}`
//         })
//       }

//       description = errorText.join('\n') || ''
//       title = errorTitle || 'An error occurred'
//     } else {
//       // console.log(result.error)
//       title = 'An error occurred'
//     }

//     // toast({
//     //   description,
//     //   title,
//     //   status: 'error',
//     //   duration: 5000,
//     //   isClosable: true,
//     // })
//   }

//   return result
// }

const test = () => {
  const instance = axios.create({
    baseURL: 'http://gammats.com:8090/nexus/',
    headers: authHeaderAPI(),
  })
  // Add a request interceptor
  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      // console.log('request')
      return config
    },
    function (error) {
      // Do something with request error
      // console.log('request error')

      return Promise.reject(error)
    },
  )

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      // console.log('response ')

      return response
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      // console.log('response error')
      return Promise.reject(error)
    },
  )
  return instance
}
const baseQuery = test()
export const baseQueryWithErrorHandler = async (args, api, extraOptions) => {
  // console.log(args, api, extraOptions)
  const result = await baseQuery(args)
  // console.log({ result })

  if (result.error) {
    let description = ''
    let title = ''
    const { status, data } = result.error

    if (status === 401) {
      description = 'Not authorized!'
    } else if (status === 404) {
      description = 'Data not found!'
    } else if (data) {
      // console.log({ data })
      const { errors, title: errorTitle } = data
      let errorText = []

      if (errors) {
        errorText = Object.entries(errors).map(ent => {
          const [key, value] = ent

          return `${key}: ${value}`
        })
      }

      description = errorText.join('\n') || ''
      title = errorTitle || 'An error occurred'
    } else {
      // console.log(result.error)
      title = 'An error occurred'
    }

    // toast({
    //   description,
    //   title,
    //   status: 'error',
    //   duration: 5000,
    //   isClosable: true,
    // })
  }

  return result
}

// initialize an empty api service that we'll inject endpoints into later as needed
// eslint-disable-next-line import/prefer-default-export
export const baseQueryAPI = createApi({
  baseQuery: baseQueryWithErrorHandler,
  refetchOnMountOrArgChange: true,

  endpoints: () => ({}),
})

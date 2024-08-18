import React, { useState, useEffect } from 'react'
import './Inputs.css'
import { useTranslation } from 'react-i18next'
// import plus from 'assets/images/plus.svg'
// import minus from 'assets/images/minus.svg'
import Select from 'react-select'
// import arrowDownCP from 'assets/images/arrowDownCP.svg'
// import Nouislider from 'nouislider-react'
// import ReadMoreModal from 'components/Modals/ReadMore/ReadMore'
// import 'nouislider/distribute/nouislider.css'
import './Nouislider.css'
// import { imageRegex } from 'Utils/Constants'
import dayjs from 'dayjs'

export const InputField = props => {
  // const { refInput, errors, ...other } = props

  return (
    <div className="w-100 relative">
      <label htmlFor={`${props.input?.name}`} className=" w-full fz11 fw-bold " >
        {(props.label)}
      </label>
      <input
        {...props?.input}
        name={props?.input?.name}
        type={props?.input?.type}
        value={props?.input?.value}
        className={`form-control  InputField ${props.className && props.className} `}
        id={props.id}
        disabled={props.disabled}
        placeholder={props.placeholder}
        autoComplete="off"
      />
      {props?.meta?.error && props.meta.touched && props?.meta?.error && (
        <p className="fz11 text-danger m-0 py-0">{(props?.meta.error)}</p>
      )}
    </div>
  )
}

export const DateField = props => {

  return (
    <div>
      <input
        {...props?.input}
        disabled={props.disabled}
        placeholder={props.placeholder}
        type="date"
        value={props?.input?.value ? props?.input?.value?.split('T')[0] : ''}
        name={props?.input?.name}
        className={`form-control  DateField  ${props.className} `}
        id={props.id}
        autoComplete="off"
      />

      {props?.meta?.error && props.meta.touched && props?.meta?.error && (
        <p className="fz11 text-danger m-0 py-0">{(props?.meta.error)}</p>
      )}
    </div>
  )
}
export const DateTimeField = props => {


  return (
    <div>
      <input
        {...props?.input}
        disabled={props.disabled}
        placeholder={props.placeholder}
        type="datetime-local"
        value={props?.input?.value ? props?.input?.value : ''}
        name={props?.input?.name}
        className={`form-control  DateField  ${props.className} `}
        id={props.id}
        autoComplete="off"
      />

      {props?.meta?.error && props.meta.touched && props?.meta?.error && (
        <p className="fz11 text-danger m-0 py-0">{(props?.meta.error)}</p>
      )}
    </div>
  )
}
export const TimeField = props => {
  const { refInput, errors, ...other } = props


  return (
    <div>
      <input
        {...props?.input}
        disabled={props.disabled}
        placeholder={props.placeholder}
        type="time"
        name={props.name}
        className={`form-control TimeField ${props.className} `}
        id={props.id}
        autoComplete="off"
      />

      {props?.meta?.error && props.meta.touched && props?.meta?.error && (
        <p className="fz11 text-danger m-0 py-0">{(props?.meta.error)}</p>
      )}
    </div>
  )
}

export const TextAreaField = props => {
  const { refInput, errors, ...other } = props


  return (
    <div>
      <textarea
        {...props?.input}
        rows={props.rows}
        disabled={props.disabled}
        className={`form-control TextAreaField ${props.className}`}
        placeholder={props.placeholder}
      />
      {props?.meta?.error && props.meta.touched && props?.meta?.error && (
        <p className="fz11 text-danger m-0 py-0">{(props?.meta.error)}</p>
      )}
    </div>
  )
}

export const SelectField = props => {
  const { t } = useTranslation()
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      padding: 10,
      zIndex: 1000,
      fontSize: '13px',
    }),
    // wrapperStyle: (provided, state) => ({
    //   ...provided,
    //   backgroundColor: ' #eeeeee',
    // }),

    control: (_, state) => ({
      borderRadius: '7px',
      backgroundColor: state.isDisabled ? '#e9ecef' : '#fff',
      border: '2px solid #afafaf',
      boxShadow: 'none',
      backgroundSize: '15px',
      backgroundRepeat: ' no-repeat',
      // backgroundImage: arrowDownCP,
      height: '33px',
      backgroundPosition: '5% center',
      fontSize: '12px',
      display: 'flex',
    }),
  }
  const DropdownIndicator = props => {
    return (
      <div className="px-2">
        {/* <img src={arrowDownCP} alt="arrowDownCP" style={{ width: '15px' }} className="mx-1" /> */}
      </div>
    )
  }
  return (
    <div className={props.disabled ? 'disabled' : ''}>
      {props.isMulti ? (
        <Select
          {...props.input}
          isMulti
          styles={customStyles}
          options={props.options}
          getOptionLabel={e => e[props.textField]}
          getOptionValue={e => e[props.valueField]}
          name={props?.input?.name}
          id={props?.input?.name}
          components={{ DropdownIndicator }}
          isDisabled={props.disabled}
          placeholder={props.placeholder ? t(`${props.placeholder}`) : t(`Select...`)}
        />
      ) : (
        <Select
          {...props.input}
          defaultValue={
            props?.input?.value && props.options?.filter(x => x[props.valueField] === props.input.value)
          }
          styles={customStyles}
          options={props.options}
          getOptionLabel={e => e[props.textField]}
          getOptionValue={e => e[props.valueField]}
          name={props?.input?.name}
          components={{ DropdownIndicator }}
          value={
            props.input?.value ? props.options?.filter(x => x[props.valueField] === props.input.value) : false
          }
          onChange={
            props.onChange
              ? e => {
                  props?.input?.onChange(e !== null ? e[props.valueField] : e)
                  props.onChange(e !== null ? e[props.valueField] : e)
                }
              : e => props?.input?.onChange(e !== null ? e[props.valueField] : e)
          }
          isDisabled={props.disabled}
          // placeholder={props.placeholder && t(`${props.placeholder}`)}
        />
      )}
      {/* <select
        // {...props?.input}
        onBlur={
          props.onChange
            ? e => {
                props.onChange(e)
                props?.input?.onChange(e)
              }
            : props?.input?.onChange
        }
        value={props?.input?.value}
        className={`form-control SelectField ${props.className}`}>
        <option value="">{props.placeholder ? t(props.placeholder) : t('Choose')}</option>
        {props.options
          ? props.options?.map((item, i) => (
              <option
                key={props.valueField ? item[props.valueField] + i : 1 + i}
                value={props.valueField ? item[props.valueField] : 'add valueField'}>
                {' '}
                {props.textField ? item[props.textField] : 'add textField'}
              </option>
            ))
          : null}
      </select> */}
      {props?.meta?.error && props.meta.touched && props?.meta?.error && (
        <p className="fz11 text-danger m-0 py-0">{(props?.meta.error)}</p>
      )}
    </div>
  )
}

export const CounterField = props => {
  // const { refInput, errors, ...other } = props


  const [valueInput, setValue] = useState(0)
  const [errorMaxNumber, setErrorMaxNumber] = useState(false)
  const {
    input: { value },
  } = props
  const maxNumber = props.maxNumber ? props.maxNumber : Infinity
  const handleChangeInput = e => {
    if (!Number.isNaN(Number(e)) === true) {
      if (e >= 0 && e <= maxNumber) {
        if (e) {
          setValue(e)
        } else {
          setValue(1)
        }
        props.input?.onChange(e)
        if (props.onChange) {
          props.onChange(e)
        }
      } else if (e > maxNumber) {
        setValue(maxNumber)
        props.input?.onChange(maxNumber)
        setErrorMaxNumber(true)
        setTimeout(() => {
          setErrorMaxNumber(false)
        }, 1000)
        if (props.onChange) {
          props.onChange(maxNumber)
        }
      }
    }
  }
  useEffect(() => {
    handleChangeInput(value)
  }, [value])
  return (
    <div className={props.disabled ? 'disabled CounterField px-0' : 'CounterField px-0'}>
      <div className="row m-0 col-12 p-0  align-items-center">
        <div className="col-6 p-0">
          <p className="m-0 p-0 text-muted fz11 fw-bold">{props.text}</p>
        </div>

        <div className="col-6 p-0 d-flex">
          <button
            type="button"
            className="none-btn"
            onClick={props?.disabled ? null : () => handleChangeInput(parseFloat(valueInput) - 1)}>
            {/* <img src={minus} alt="minus" /> */}
          </button>
          <p className="m-0 px-1 fz12 fw-bold">
            <input
              {...props?.input}
              disabled={props?.disabled}
              placeholder={props?.placeholder}
              value={props?.input?.value ? props.input.value : valueInput}
              type={props?.input?.type}
              name={props?.input?.name}
              id={props.id}
              autoComplete="off"
              onChange={e => handleChangeInput(e.target.value)}
            />
          </p>
          <button
            type="button"
            className="none-btn"
            onClick={
              props?.disabled
                ? null
                : () =>
                    parseFloat(valueInput)
                      ? handleChangeInput(parseFloat(valueInput) + 1)
                      : handleChangeInput(0 + 1)
            }>
            {/* <img src={plus} alt="plus" /> */}
          </button>
        </div>
        {errorMaxNumber && (
          <p className="fz11 text-danger m-0 py-0 col-12">the maximum number is {errorMaxNumber}</p>
        )}
        {props?.meta?.error && props.meta.touched && props?.meta?.error && (
          <p className="fz11 text-danger m-0 py-0 col-12">{(props?.meta.error)}</p>
        )}
      </div>
    </div>
  )
}

export const CheckboxField = (props) => {
  return (
    <div className="w-100">
      <div className="checkbox overflow-hidden">
        <input
          {...props?.input}
          type="checkbox"
          name={props?.input?.name}
          id={props?.input?.name}
          disabled={props.disabled}
          checked={props.checked} // Controlled by parent component
          onChange={(e) => {
            props?.input?.onChange(e);
            if (props.onChange) {
              props.onChange(e);
            }
          }}
        />
        <label htmlFor={props?.input?.name} className={`muted-border ${props.disabled ? 'disabled' : ''}`} >
          <span className="fz11 fw-bold text-nowrap">{props.label}</span>
        </label>
      </div>
      {props?.meta?.error && props.meta.touched && (
        <p className="fz11 text-danger m-0 py-0">{props?.meta.error}</p>
      )}
    </div>
  );
};




export const RadioField = props => {


  return (
    <div>
      <div className="RadioField d-flex align-items-center">
        <input
          {...props?.input}
          name={props.input.name}
          id={props.id}
          type="radio"
          value={props.input.value}
          onChange={
            props.onChange
              ? e => {
                  props.onChange(e)
                  props?.input?.onChange(e)
                }
              : props?.input?.onChange
          }
        />
        <label className="fz12 fw-bold px-1 m-0 " htmlFor={props.id}>
          {props.label}
        </label>
      </div>
      {props?.meta?.error && props.meta.touched && props?.meta?.error && (
        <p className="fz11 text-danger m-0 py-0">{(props?.meta.error)}</p>
      )}
    </div>
  )
}

// export const ImageField = props => {
// 
//   const [error, setError] = useState(false)
//   const handleImage = e => {
//     const { files } = e.target
//     if (files && files[0]) {
//       const file = files[0]
//       if (imageRegex.test(file.name) && file.size / 1024 / 1024 < 7) {
//         const reader = new FileReader()
//         reader.readAsDataURL(file)
//         reader.onloadend = e => {
//           props?.input?.onChange(reader.result)
//         }
//         setError(false)
//       } else {
//         setError(true)
//       }
//     }
//   }
//   return (
//     <div className="d-block ">
//       <input
//         id={props.id}
//         className={props.className}
//         onChange={e => handleImage(e)}
//         multiple={props.multiple}
//         type={props?.input?.type}
//         name={props?.input?.name}
//         autoComplete="off"
//         style={{ display: 'none' }}
//       />
//       {error && <p className="fz11 text-danger m-0 py-0">{('only image - max 7MB')}</p>}{' '}
//     </div>
//   )
// }

// export const RangeField = props => {
// 

//   return (
//     <div>
//       <div className="  py-2">
//         {/* {...props?.input}
//           name={props.input.name}
//           id={props.id}
//           value={props.input.value}
//           onChange={
//             props.onChange
//               ? e => {
//                   props.onChange(e)
//                   props?.input?.onChange(e)
//                 }
//               : props?.input?.onChange
//           } */}
//         <Nouislider
//           range={props.range}
//           start={props.input?.value ? props.input?.value : props.start}
//           connect={props.connect}
//           name={props.input.name}
//           step={props.step}
//           disabled={props.disabled}
//           format={{
//             to(value) {
//               return value
//             },
//             from(value) {
//               return Number(value)
//             },
//           }}
//           {...props?.input}
//           value={props.input?.value}
//           onChange={
//             props.onChange
//               ? e => {
//                   props.onChange(e)
//                   props?.input?.onChange(e)
//                 }
//               : props?.input?.onChange
//           }
//         />
//       </div>
//       {props?.meta?.error && props.meta.touched && props?.meta?.error && (
//         <p className="fz11 text-danger m-0 py-0">{(props?.meta.error)}</p>
//       )}
//     </div>
//   )
// }

export const ColorField = props => {
  const [state, setState] = useState()


  return (
    <div>
      <div className=" ColorField ">
        <div className="w-100 d-flex justify-content-between align-content-center">
          <button
            className={`circle  none-btn color-event-1 ${state === '#006ab1' ? 'active' : ''}`}
            type="button"
            onClick={() => {
              setState('#006ab1')
              props?.input?.onChange('#006ab1')
            }}
          />
          <button
            className={`circle  none-btn color-event-2 ${state === '#616161' ? 'active' : ''}`}
            type="button"
            onClick={() => {
              setState('#616161')
              props?.input?.onChange('#616161')
            }}
          />
          <button
            className={`circle  none-btn color-event-3 ${state === '#8e24aa' ? 'active' : ''}`}
            type="button"
            onClick={() => {
              setState('#8e24aa')
              props?.input?.onChange('#8e24aa')
            }}
          />
          <button
            className={`circle  none-btn color-event-4 ${state === '#f4511e' ? 'active' : ''}`}
            type="button"
            onClick={() => {
              setState('#f4511e')
              props?.input?.onChange('#f4511e')
            }}
          />
          <button
            className={`circle  none-btn color-event-5 ${state === '#000000' ? 'active' : ''}`}
            type="button"
            onClick={() => {
              setState('#000000')
              props?.input?.onChange('#000000')
            }}
          />
        </div>
        <input
          {...props?.input}
          name={props.input.name}
          id={props.id}
          className="d-none"
          type="radio"
          value={state}
          onChange={
            props.onChange
              ? e => {
                  props.onChange(e)
                  props?.input?.onChange(e)
                }
              : props?.input?.onChange
          }
        />
      </div>
      {props?.meta?.error && props.meta.touched && props?.meta?.error && (
        <p className="fz11 text-danger m-0 py-0">{(props?.meta.error)}</p>
      )}
    </div>
  )
}
export const DaysField = props => {


  const [state, setState] = useState([])
  const handleChange = value => {
    const hasValue = state.filter(x => x === value)
    if (hasValue.length > 0) {
      setState(state.filter(x => x !== value))
      props?.input?.onChange(state.filter(x => x !== value))
    } else {
      setState([...state, value])
      props?.input?.onChange([...state, value])
    }
  }
  return (
    <div>
      <div className="DaysField ">
        <div className="w-100 d-flex justify-content-between align-content-center">
          <button
            className={`circle  none-btn  ${state.filter(x => x === 'sunday').length > 0 ? 'active' : ''}`}
            type="button"
            disabled={props.disabled}
            onClick={() => {
              handleChange('sunday')
            }}>
            {('S')}
          </button>
          <button
            className={`circle  none-btn  ${state.filter(x => x === 'monday').length > 0 ? 'active' : ''}`}
            type="button"
            disabled={props.disabled}
            onClick={() => {
              handleChange('monday')
            }}>
            {('M')}
          </button>
          <button
            className={`circle  none-btn  ${state.filter(x => x === 'tuesday').length > 0 ? 'active' : ''}`}
            disabled={props.disabled}
            type="button"
            onClick={() => {
              handleChange('tuesday')
            }}>
            {('T')}
          </button>
          <button
            className={`circle  none-btn  ${state.filter(x => x === 'wednesday').length > 0 ? 'active' : ''}`}
            disabled={props.disabled}
            type="button"
            onClick={() => {
              handleChange('wednesday')
            }}>
            {('W')}
          </button>
          <button
            className={`circle  none-btn  ${state.filter(x => x === 'thursday').length > 0 ? 'active' : ''}`}
            disabled={props.disabled}
            type="button"
            onClick={() => {
              handleChange('thursday')
            }}>
            {('T')}
          </button>
          <button
            className={`circle  none-btn  ${state.filter(x => x === 'friday').length > 0 ? 'active' : ''}`}
            disabled={props.disabled}
            type="button"
            onClick={() => {
              handleChange('friday')
            }}>
            {('F')}
          </button>
          <button
            className={`circle  none-btn  ${state.filter(x => x === 'saturday').length > 0 ? 'active' : ''}`}
            disabled={props.disabled}
            type="button"
            onClick={() => {
              handleChange('saturday')
            }}>
            {('S')}
          </button>
        </div>
        <input
          {...props?.input}
          name={props.input.name}
          id={props.id}
          className="d-none"
          type="radio"
          disabled={props.disabled}
          value={state}
          onChange={
            props.onChange
              ? e => {
                  props.onChange(e)
                  props?.input?.onChange(e)
                }
              : props?.input?.onChange
          }
        />
      </div>
      {props?.meta?.error && props.meta.touched && props?.meta?.error && (
        <p className="fz11 text-danger m-0 py-0">{(props?.meta.error)}</p>
      )}
    </div>
  )
}

// input component
export const Checkbox = props => {


  return (
    <div className="w-100">
      <div className="checkbox">
        <input
          type="checkbox"
          name={props.name}
          value={props.checked}
          checked={props.checked}
          id={props.name}
          disabled={props.disabled}
          onChange={
            props.onChange
              ? e => {
                  props.onChange(e)
                }
              : null
          }
        />
        <label htmlFor={props.name} className={`mx-auto ${props.disabled ? 'disabled' : ''}`}>
          <span className="fz12 fw-bold">{props.label}</span>
        </label>
      </div>
    </div>
  )
}

export const DateLineSeprator = ({ date }) => {
  return (
    <div className=" sperator-line ">
      <div className=" text-sperator-line  ">{dayjs(date).format('DD/MM/YYYY')}</div>
    </div>
  )
}
export const ToggleSlider = ({ action, className }) => {
  const [selected, setToggleSelected] = useState(false)
  useEffect(() => {
    if (selected && action) {
      action()
    }
  }, [selected])
  return (
    <div className={`align-self-center ${className}`}>
      <div className="toggleSlider align-self-center">
        <div className={`toggle-container ${selected ? 'toggle-container-active' : ''}`}>
          <button
            type="button"
            className={`dialog-button ${selected ? '' : 'disabled'}`}
            onClick={e => setToggleSelected(!selected)}
          />
        </div>
      </div>
    </div>
  )
}
// export const ReadMore = ({ id, children, maxCharacterCount = 150, onClick, className, title = '' }) => {
//   const TruncatedText = children.length > maxCharacterCount ? children.slice(0, maxCharacterCount) : children
//   return (
//     <div className="d-flex flex-wrap m-0  ">
//       <p className={className}>
//         {TruncatedText}
//         {children.length > maxCharacterCount && (
//           <button
//             type="button"
//             className="text-primary p-0 ps-2 m-0 border-0 bg-white"
//             data-bs-toggle="modal"
//             data-bs-target={`#ReadMore${id}`}>
//             Read More
//           </button>
//         )}
//       </p>
//       <ReadMoreModal id={`ReadMore${id}`} title={title} details={children} />
//     </div>
//   )
// }

export const CustomFilterSelection = ({
  id,
  value,
  activeClassName,
  defaultClassName,
  label,
  onSelect,
  select,
  index,
}) => {
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    onSelect({ value, checked, index })
  }, [checked])

  return (
    <label htmlFor={id} className={checked || select ? activeClassName : defaultClassName}>
      <input
        checked={checked}
        id={id}
        type="checkbox"
        value={value}
        className="d-none"
        onChange={e => setChecked(e.target.checked)}
      />
      {label}
    </label>
  )
}

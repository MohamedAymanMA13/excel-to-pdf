/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react'
// import { connect } from 'react-redux'
import './Table.css'
import { Link } from 'react-router-dom'
// import { Select, Unselect, UnselectAll, SelectAll, SelectRow } from 'redux/store/actions'
// import { SelectField } from 'components/Inputs/Inputs'
// import sorting from 'assets/images/sorting.svg'
// import HightComponent from 'components/HightComponent/HightComponent'
// import Pagination from 'components/Pagination/Pagination'

function Table(props) {
  const [state, setState] = useState({ sortedBy: '', sortingType: '' })
  const [calcHight, setCalcHight] = useState(false)
  // all props
  //  indexKey = unique number like id   *require
  //  tableHeaders = colum name        *require
  //  elements = all data              *require
  //  onSortingChange = callBack function to get sorting info *require
  //  SelectItems = all selected Selected Items
  //  renderCell = if you want to render another component or format value to date
  //  width = width colum
  //  height =  height table -- send auto if you don't want to calculate the height of the table based on the height of the user screen
  const indexKeyItem = props.indexKey ? props.indexKey : 'id'
  const SelectHandle = selectedItem => {
    const found = props.selecteditems[props.SelectItems]
      ? props.selecteditems[props.SelectItems].find(item => item[indexKeyItem] === selectedItem[indexKeyItem])
      : null
    if (found) {
      props.Unselect(props.SelectItems, selectedItem)
    } else if (props.radioButton) {
      props.UnselectAll(props.SelectItems)
      props.Select(props.SelectItems, selectedItem)
    } else {
      props.Select(props.SelectItems, selectedItem)
    }
  }
  // SelectAllHandle = () => {
  //     if ( props.selecteditems[ props.SelectItems] &&  props.elements &&  props.selecteditems[ props.SelectItems].length ==  props.elements.length) {
  //          props.UnselectAll( props.SelectItems)
  //     } else {
  //          props.SelectAll( props.elements,  props.SelectItems)
  //     }
  // }

  const SelectAllHandle = () => {
    if (
      props.selecteditems[props.SelectItems] &&
      props.elements &&
      props.selecteditems[props.SelectItems].length === props.elements.length
    ) {
      props.UnselectAll(props.SelectItems)
    } else {
      props.SelectAll(props.elements, props.SelectItems)
    }
  }
  const inputRef = useRef()

  useEffect(() => {
    // Calculating the height of the table according to the height of the user's screen
    if (!props.height) {
      const offsets = inputRef.current.getBoundingClientRect()
      const heightBody = document.getElementById('root').firstChild.getBoundingClientRect()
      inputRef.current.style.height = `${parseFloat(heightBody.height - (offsets.top + 60)).toFixed(0)}px`
      setCalcHight(true)
    } else {
      setCalcHight(true)
    }
  }, [])
  const handelSorting = name => {
    if (state.sortedBy === name) {
      if (state.sortingType === 'ASC') {
        setState({ sortedBy: name, sortingType: 'DESC' })
        props.onSortingChange({ sortedBy: name, sortingType: 'DESC' })
      } else {
        setState({ sortedBy: name, sortingType: 'ASC' })
        props.onSortingChange({ sortedBy: name, sortingType: 'ASC' })
      }
    } else {
      setState({ sortedBy: name, sortingType: 'ASC' })
      props.onSortingChange({ sortedBy: name, sortingType: 'ASC' })
    }
  }
  return (
    <div>
      <div className="TableComponent py-0 scroll-table">
        <div ref={inputRef} id="maxHeightTableComponent">
          {calcHight && (
            <div className="position-relative px-0 py-0 m-0 table dropdown">
              <div className={`py-0  mx-0 `} style={props.height ? { height: props.height } : {}}>
                <table
                  className={
                    props && props.tableCustomeStyle
                      ? `table text-center ${props.tableCustomeStyle}`
                      : 'table  table-hover text-center '
                  }>
                  <thead className="">
                    <tr className="">
                      {props.SelectItems ? (
                        <th className=" py-2 fz12">
                          <div className=" checkboxContainer  d-block p-0 m-0">
                            <label className=" p-0 m-0" htmlFor="radioButton">
                              <input
                                id="radioButton"
                                type="checkbox"
                                onChange={SelectAllHandle}
                                checked={
                                  // eslint-disable-next-line no-nested-ternary
                                  props.selecteditems[props.SelectItems]
                                    ? props.selecteditems[props.SelectItems].length > 0 &&
                                      props.selecteditems[props.SelectItems].length === props.elements?.length
                                      ? 'checked'
                                      : false
                                    : false
                                }
                              />
                              {/* <span className="checkmark" /> */}
                            </label>
                          </div>
                        </th>
                      ) : null}
                      {props.tableHeaders?.map((header, i) => (
                        <th
                          key={`${i + 1}-Headers`}
                          className={
                            props && props.headCustomStyle
                              ? `${props.headCustomStyle} py-2   m-0`
                              : ' py-2 fz12 fc-secondary'
                          }
                          style={header.width > 1 ? { width: parseFloat(header.width) } : {}}>
                          <div className="d-flex justify-content-center">
                            {header.title}
                            {header.sorting && (
                              <button
                                type="button"
                                className="d-flex px-1  align-items-center none-btn"
                                onClick={() => handelSorting(header.sorting)}>
                                {/* {state.sortedBy === header.sorting ? (
                                  <img
                                    src={sorting}
                                    alt="sorting"
                                    className={
                                      state.sortingType === 'ASC'
                                        ? 'img12  rotate-180 transition-05'
                                        : 'img12  transition-05'
                                    }
                                  />
                                ) : (
                                  <div className="d-flex">
                                    <img src={sorting} alt="sorting" className="img10  rotate-180" />
                                    <img src={sorting} alt="sorting" className="img10  " />
                                  </div>
                                )} */}
                              </button>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {props.elements?.map((row, i) => {
                      // eslint-disable-next-line no-return-assign
                      return (
                        <tr className="py-0" key={`${i + 1}table`}>
                          {props.SelectItems ? (
                            <td className="py-1 fz12 pt-2  ">
                              <label className="checkboxContainer p-0 m-0 pt-1">
                                <input
                                  type="checkbox"
                                  checked={
                                    // eslint-disable-next-line no-nested-ternary
                                    props.selecteditems[props.SelectItems]
                                      ? props.selecteditems[props.SelectItems].filter(
                                          item => item[indexKeyItem] === row[indexKeyItem],
                                        )[0]
                                        ? 'checked'
                                        : false
                                      : false
                                  }
                                  key={`${row[indexKeyItem]}-checkboxContainer`}
                                  onChange={() => SelectHandle(row)}
                                />
                                <span
                                  className={!props.radioButton ? ' checkmark ' : 'checkmark rounded-circle'}
                                />
                              </label>
                            </td>
                          ) : null}
                          {props.tableHeaders?.map((col, i) => (
                            <td className="py-2 fz12 fw-bold" key={`${i + 1}table-col`}>
                              {col.renderCell ? col.renderCell(row, col) : row[col.value]}
                            </td>
                          ))}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <div className=" pt-3">
        {props.pagination && (
          <Pagination
            totalItems={props.pagination.totalItems}
            onPaginationChange={props.pagination.onPaginationChange}
          />
        )}
      </div> */}
    </div>
  )
}


export default Table

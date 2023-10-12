import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import "./style.css"

const BreadcrumbItem = ({ children, ...props }) => (
  <li className='breadcrumb-item' {...props}>
    {children}
  </li>
)

const BreadcrumbSeparator = ({ children, ...props }) => (
  <li className='breadcrumb-separator' {...props}>
    {children}
  </li>
)

const toBreadcrumbItem = (child, index) => (
  <BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
)

const withSeparator = (lastIndex, separator) => (acc, child, index) => {
  const notLast = index < lastIndex
  if (notLast) {
    acc.push([
      child,
      <BreadcrumbSeparator key={`breadcrumb_sep${index}`}>
        { separator ? separator : <MdKeyboardArrowRight /> }
      </BreadcrumbSeparator>,
    ])
  } else { acc.push(child) }
  return acc
}


const BreadcrumbCustom = ({ separator, collapse = {}, ...props }) => {
  let children = React.Children.toArray(props.children)

  const totalItems = children.length
  const lastIndex = totalItems - 1

  children = children.map(toBreadcrumbItem).reduce(withSeparator(lastIndex, separator), [])


  return <ol>{children}</ol>
}

export default BreadcrumbCustom
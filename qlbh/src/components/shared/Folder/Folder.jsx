
import React, { Component, useEffect, useState } from 'react'
import usePrevious from '../hooks/UsePrevious';
import icon from './icon.png'
import './style.css'

export default function Folder({dataInput, onSelect, url, lableName}) {
    const [data, setData] = useState([])
    const prevCount = usePrevious(data)

    useEffect(() => {
     if(data !== prevCount){
        setData(dataInput)
     }
    }, [data])
    
    const handleSelect = (value) => {
        onSelect() && onSelect(value);
      };

  return (
    <div>
        <div className="folder clearfix">
        <div className="folder-item" onClick={() => handleSelect('item')}>
            <div><img src={icon} alt="" /></div>
            <p className="content">{lableName}</p>
          </div>
  </div></div>
  )
}





// import React, { Component, useEffect, useState } from 'react'
// import './style.css'
// import icon from './icon.png'
// // import { callApi2 } from '../../service/api';

// export default class Folder extends Component {
//   /**
//    * props: url | data, lableName, onSelect()
//    */
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: []
//     };
//   }

//   componentDidMount() {
//     // if (this.props.url) {
//     //   callApi2(this.props.url)
//     //     .then(res => this.setState({ data: res.value }))
//     //     .catch(err => console.log(err));
//     // }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.props.data !== prevProps.data) {
//       this.setState({ data: this.props.data })
//     }
//   }

//   onSelect = (value) => {
//     this.props.onSelect && this.props.onSelect(value);
//   };

//   render() {
//     return (
//       <div className="folder clearfix">
//         {/* {
//           this.state.data.length !== 0 ? this.state.data.map((item, index) => {
//             return (
//               <div className="folder-item" key={index} onClick={() => this.onSelect(item)}>
//                 <div><img src={icon} alt="" /></div>
//                 <p className="content">{item.STT}. Lĩnh vực {item[this.props.label]}</p>

//                 {item.count && <div className="count">({item.count} {this.props.itemTitle})</div>}

//               </div>
//             )
//           })
//             :
//             <div className="alert alert-warning">Chưa có dữ liệu!</div>
//         } */}
//             <div className="folder-item" onClick={() => this.onSelect('item')}>
//                 <div><img src={icon} alt="" /></div>
//                 <p className="content">Lĩnh vực</p>
//               </div>
//       </div>
//     )
//   }
// }

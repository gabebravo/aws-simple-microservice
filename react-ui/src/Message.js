import React from 'react';

const styles = {
  ul: {
    listStyleType: "none",
    marginBototm: "10"
  }
}

const printItem = item => (
  <ul key={item.id} id={item.id} style={styles.ul}>
    <li>{`You are ${item.age} years old`}</li>
    <li>{`${item.height} inches tall`}</li>
    <li>{`${item.income} per month`}</li>
  </ul>
)

const Message = ({ items = null, item = null, error = false }) => 
 error ? (<div><h1>Network Error</h1></div>):
 !error && items ? (
   <div>
    <h4>Users</h4>
    { items.map( item => printItem(item)) }
    <h4>User</h4>
    { item.map( item => printItem(item)) }
   </div>
 ) : null

export default Message;


import React from 'react';


const ContentList = ({ content, onOpenModal, setIsTitleClick, isSlider = false }) => {
  return (
    <ul>
      {content.length && content?.map((item) => (
        <li key={item._id}>
          {!isSlider && (<button onClick={() => { onOpenModal(item); setIsTitleClick(true) }}>{(item.title) || (item.name)}</button>)}
          {isSlider && <p>{(item.title) || (item.name)} </p>}
          <hr />

        </li>
      ))}
    </ul>
  );
};

export default ContentList;
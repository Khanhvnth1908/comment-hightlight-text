import React, { useState } from "react";

import Content from "./components/Content";
import CommentBox from "./components/CommentBox";
import HighlightButtonsGroup from "./components/HighlightButtonsGroup";
import CommentsList from "./components/CommentsList";

import { saveSelection, restoreSelection } from "./selection-utils";

const LandingPage = () => {
  const [hiddenCommentBox, setHiddenCommentBox] = useState(true);
  const [hiddenButtonGroup, setHiddenButtonGroup] = useState(true);
  const [selectedRange, setSelectedRange] = useState(null);
  const [comments, setComments] = useState([
    { id: "Timestamp123332323", message: "This is it" },
    { id: "modernComplex", message: "Yeah! " },
  ]);

  const [highlightBtnsGroupLayout, setHighlightBtnsGroupLayout] = useState({
    position: "absolute",
    left: "0",
    top: "0",
    heightInPixel: 28,
    widthInPixel: 70,
  });

  // seleted region reactangle [left, top, width, hieght]
  const sethighlightBtnsGroupPosition = ({ left, top, width, height }) => {
    const deepBtnGroupLayout = { ...highlightBtnsGroupLayout };
    const { heightInPixel, widthInPixel } = deepBtnGroupLayout;
    const computedLeft = left + width / 2 - widthInPixel / 2;
    const computedTop = window.scrollY + top - heightInPixel;

    setHighlightBtnsGroupLayout(
      Object.assign(deepBtnGroupLayout, {
        left: computedLeft,
        top: computedTop,
      })
    );
  };

  const showButtonsGroup = () => {
    setHiddenButtonGroup(false);
  };

  const saveAndRestoreSelection = () => {
    const savedSelection = saveSelection();
    setSelectedRange(savedSelection);
    toggleCommentBox();
    restoreSelection(savedSelection);
  };

  const toggleCommentBox = () => {
    setHiddenCommentBox(!hiddenCommentBox);
  };

  // Could be used outside click of HighlightButtonsGroup
  const toggleButtonsGroup = () => {
    setHiddenButtonGroup(!hiddenButtonGroup);
  };

  const updateCommentList = (newComment) => {
    setComments([...comments, newComment]);
  };

  return (
    <div>
      <Content
        setBtnsGroupPosition={sethighlightBtnsGroupPosition}
        showButtonsGroup={showButtonsGroup}
      />
      <HighlightButtonsGroup
        layout={highlightBtnsGroupLayout}
        hidden={hiddenButtonGroup}
        saveAndRestoreSelection={saveAndRestoreSelection}
      />
      <CommentBox
        hidden={hiddenCommentBox}
        selectedRange={selectedRange}
        updateCommentList={updateCommentList}
        toggleCommentBox={toggleCommentBox}
        toggleButtonsGroup={toggleButtonsGroup}
      />
      <CommentsList comments={comments} />
    </div>
  );
};
// }

export default LandingPage;

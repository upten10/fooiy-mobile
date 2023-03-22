import React from 'react';
import {fooiyColor} from '../../../common/globalStyles';

const checkFeedAuthorization = (
  setButtons,
  domain,
  feed_writer,
  userInfoRedux,
  workingComponent,
  updateComponent,
  deleteComponent,
  reportComponent,
) => {
  if (workingComponent.account_id === userInfoRedux.public_id) {
    setButtons([
      {
        name: '수정',
        domain: domain,
        onClick: () => updateComponent(),
        isNext: false,
        textColor: fooiyColor.G600,
      },
      {
        name: '삭제',
        domain: domain,
        onClick: () => deleteComponent(),
        isNext: true,
        textColor: fooiyColor.P700,
      },
    ]);
  } else if (userInfoRedux.public_id === feed_writer) {
    setButtons([
      {
        name: '신고',
        domain: domain,
        onClick: () => reportComponent(),
        isNext: true,
        textColor: fooiyColor.G600,
      },
      {
        name: '삭제',
        domain: domain,
        onClick: () => deleteComponent(),
        isNext: true,
        textColor: fooiyColor.P700,
      },
    ]);
  } else {
    setButtons([
      {
        name: '신고',
        domain: domain,
        onClick: () => reportComponent(),
        isNext: true,
        textColor: fooiyColor.P700,
      },
    ]);
  }
};

export default checkFeedAuthorization;

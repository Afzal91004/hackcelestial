import React from "react";

function PersonalDetailPreview(resumeInfo) {
  return (
    <h2>
      {resumeInfo?.firstName} {resumeInfo?.lastName}
    </h2>
  );
}

export default PersonalDetailPreview;

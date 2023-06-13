import React from 'react'

const NoData = ({title = 'Data'}) => {
  return (
    <section className="padding-lg margin-lg flex aic jcc heading-md">
      No {title}
    </section>
  );
}

export default NoData
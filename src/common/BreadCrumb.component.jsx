import React, { Component } from 'react';
import { Breadcrumb } from 'semantic-ui-react';

//styles
import './BreadCrumb.css';

const BreadcrumbComponent = props => {
  const { page, selection } = props;

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Section> {page} </Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active> {selection}</Breadcrumb.Section>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbComponent;

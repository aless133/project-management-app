import React, { Component, ReactNode } from 'react';
import { ErrorPage } from 'pages/ErrorPage';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state = { hasError: false };

  public componentDidCatch() {
    this.setState({ hasError: true });
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorPage text="Something went wrong" />;
    }

    return this.props.children;
  }
}

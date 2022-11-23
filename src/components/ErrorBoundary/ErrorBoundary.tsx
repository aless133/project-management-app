import ErrorPage from 'pages/ErrorPage';
import React, { Component, ReactNode } from 'react';

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
      return <ErrorPage isNotFound={false} />;
    }

    return this.props.children;
  }
}

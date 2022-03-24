import React, { Component } from 'react';
import type { ReactNode } from 'react';

type propsType = { children: ReactNode };
type stateType = { hasError: boolean };

class ErrorBoundary extends Component<propsType, stateType> {
    constructor(props: propsType) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(/* _: Error */): stateType {
        return { hasError: true };
    }

    // TODO Add Logger
    // public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    //     console.error("Uncaught error:", error, errorInfo);
    //   }

    render(): ReactNode {
        if (this.state.hasError) {
            // UI de repli.
            return (
                <div
                    style={{
                        margin: '3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div>
                        <h1 style={{ textAlign: 'start' }}>Oups</h1>
                        <span>Une erreur est survenue</span>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

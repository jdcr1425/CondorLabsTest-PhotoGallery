import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Content extends Component {
    static propTypes = {
        body: PropTypes.object.isRequired
    };
    render() {
        const { body } = this.props;
        return (
            <div>
                {body}
            </div>
        )
    }
}

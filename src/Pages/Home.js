import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loading from '../Components/Loading';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            msgContent: null,
            msgType: null,
        };
    }
    componentDidMount() {
        // this.props.siteSummary(0, 10);
        // this.props.ipNodeSummary(0, 10, "IP");
        // this.props.mwNodeSummary(0, 10, "MW");
    }

    render() {
        if (true) {
            return (
                <div className="list-page">
                    {this.state.msgContent &&
                    <div className={this.state.msgType} role="alert">
                        {this.state.msgContent}
                    </div>
                    }
                    <div className="wrap">
                        <div className="col-full">
                            <div className="card">
                                <div className="card-header">
                                    <i className="fa fa-align-justify"></i> Log Filter

                                </div>
                                <div className="card-body">
                                    <div className="form-group wrap">
                                        <div className="col-full">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-search"></i></span>
                                                </div>
                                                <input
                                                    onChange={this.handleSearch}
                                                    value={this.state.searchterm}
                                                    name="searchterm"
                                                    className="form-control form-control-lg"
                                                    placeholder="Search"
                                                    type="text" />
                                                <button type="submit" className="btn btn-success"><i className="far fa-dot-circle"></i> Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )
        } else {
            return (
                <Loading/>
            );
        }
    }
}

function mapStateToProps(globalState) {
    return {
        sitesummary: globalState.sitesummary,
        ipnodesummary: globalState.ipnodesummary,
        mwnodesummary: globalState.mwnodesummary
    };

}

export default connect(mapStateToProps, {})(Home);
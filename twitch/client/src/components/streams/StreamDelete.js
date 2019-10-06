import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream , deleteStream} from '../actions';
import { connect } from 'react-redux';

 class StreamDelete extends React.Component{
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }
    renderActions(){
        return(
            <React.Fragment>
                <button onClick={()=> this.props.deleteStream(this.props.match.params.id)} className="ui button negative">Delete</button>
                <button onClick={()=>history.push('/')} className="ui button">Cancel</button>
            </React.Fragment>
        );
    }
    renderContent(){
        if(!this.props.stream){
            return "Are you sure you want to delete this stream?";
        }
        return `Are you sure you want to delete this stream "${this.props.stream.title}"`;
    }
    render(){
        return(
            <Modal 
                title="Delete Stream"
                content= {this.renderContent()}
                actions={this.renderActions()}
                onDismiss={()=>history.push('/')}
            />
        );
   }
 }
const mapsStateToProps = (state , ownProps) =>{
    return { stream : state.streams[ownProps.match.params.id]}
} 

 export default connect(mapsStateToProps , {fetchStream , deleteStream})(StreamDelete);

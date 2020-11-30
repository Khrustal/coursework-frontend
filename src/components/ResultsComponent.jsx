import React, {Component} from 'react'
import DataService from "../api/DataService";
import MaterialTable from 'material-table'

import { forwardRef } from 'react';

import VisibilityIcon from '@material-ui/icons/Visibility';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  };
  
class ResultsComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            results : null,
            loaded: false
        }
        this.getBody = this.getBody.bind(this)
        this.openResultClicked = this.openResultClicked.bind(this)
        this.getTable = this.getTable.bind(this)
    }

    componentDidMount() {
        let sessionId = this.props.match.params.id
        DataService.retrieveAllResults(sessionId)
          .then(
              response => {
                  this.setState({results : response.data, loaded: true})
              }
          ) 
    }

    openResultClicked(id) {
        this.props.history.push(`/sessions/${this.props.match.params.id}/results/${id}`)
    }

    getTable() {
        return (
                <MaterialTable
                icons={tableIcons}
                localization={{
                    header: {
                        actions: "Действия",
                    }
                }}
                title = {<span style={{fontFamily: "Victor Mono Heavy", fontSize: 22}}>Результаты</span>}
                columns={[
                    { title: 'Дата', field: 'date', headerStyle: {fontFamily: "Iosevka Semibold", fontSize: 19}},
                    { title: 'Время', field: 'time', headerStyle: {fontFamily: "Iosevka Semibold", fontSize: 19}},
                    { title: 'Процент выполнения', field: 'rightAnswers', render: row => <span>{ Math.round(row['rightAnswers'])+"%" }</span>,
                     headerStyle: {fontFamily: "Iosevka Semibold", fontSize: 19} }
                ]}
                data={this.state.results}  
                options={{
                    actionsColumnIndex: -1,
                    headerStyle: {backgroundColor: '#EEE', fontFamily: "Iosevka Semibold", fontSize: 19},
                    rowStyle: {fontFamily: "Victor Mono"},
                }}     
                actions={[ 
                    {
                        icon: VisibilityIcon,
                        tooltip: 'Просмотреть',
                        onClick: (event, rowData) => this.openResultClicked(rowData.id)
                    }
                ]}
                />
          )
    }

    getBody() {
        if(this.state.loaded)
            return this.getTable()
        else 
                    return <div>Loading...</div>
        
    }

    render() {
        return (
            this.getBody()
        )
    }
}

export default ResultsComponent
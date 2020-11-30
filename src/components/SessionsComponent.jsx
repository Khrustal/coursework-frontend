import React, {Component} from 'react'
import DataService from "../api/DataService";
import AuthenticationService from '../api/AuthenticationService.js'
import IconButton from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MaterialTable from 'material-table'

import { forwardRef } from 'react';

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
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Add, Delete, PlayArrow } from '@material-ui/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';


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
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

class SessionsComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            sessions : [],
            message : null
        }
        this.deleteSessionClicked = this.deleteSessionClicked.bind(this)   
        this.openSessionClicked = this.openSessionClicked.bind(this)   
        this.addSessionClicked = this.addSessionClicked.bind(this)
        this.refreshSessions = this.refreshSessions.bind(this)
        this.startTestClicked = this.startTestClicked.bind(this)
        this.openResultsClicked = this.openResultsClicked.bind(this)
        this.getTable = this.getTable.bind(this)
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
            title = {<span style={{fontFamily: "Victor Mono Heavy", fontSize: 22}}>Сессии</span>}
            columns={[
                { title: 'Название', field: 'name', headerStyle: {fontFamily: "Iosevka Semibold", fontSize: 19}},
            ]}
            data={this.state.sessions}  
            options={{
                actionsColumnIndex: -1,
                headerStyle: {backgroundColor: '#EEE', fontFamily: "Iosevka Semibold", fontSize: 19},
                rowStyle: {fontFamily: "Victor Mono"},
            }}     
            actions={[
                {
                    icon: PlayArrow,
                    tooltip: 'Начать тест',
                    onClick: (event, rowData) => this.startTestClicked(rowData.id)
                },
                {
                    icon: VisibilityIcon,
                    tooltip: 'Посмотреть результаты',
                    onClick: (event, rowData) => this.openResultsClicked(rowData.id)
                }, 
                {
                    icon: Edit,
                    tooltip: 'Редактировать сессию',
                    onClick: (event, rowData) => this.openSessionClicked(rowData.id)
                },
                {
                    icon: Add,
                    tooltip: 'Создать сессию',
                    isFreeAction: true,
                    onClick: (event) => this.addSessionClicked()
                },
                {
                    icon: Delete,
                    tooltip: 'Удалить сессию',
                    onClick: (event, rowData) =>this.deleteWordClicked(rowData.id)
                }
            ]}
            />
      )
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    componentDidMount() {
        this.refreshSessions();
    }

    refreshSessions() {
        let userId = AuthenticationService.getLoggedUserId();
        DataService.retrieveAllSessions(userId)
          .then(
              response => {
                  this.setState({sessions : response.data})
              }
          ) 
    }

    deleteSessionClicked(id) {
        DataService.deleteSession(id)
         .then (
             response => {
                this.setState({message : `Сессия удалена`})
                this.refreshSessions()
             }
         )
        
    }

    addSessionClicked() {
        this.props.history.push(`/sessions/create`)
    }

    openSessionClicked(id) {
        this.props.history.push(`/sessions/${id}`)
    }

    openResultsClicked(id) {
        this.props.history.push(`/sessions/${id}/results`)
    }

    startTestClicked(id) {
        this.props.history.push(`/sessions/${id}/test`)
    }

    render() {
        return this.getTable()
        // return (
        //     <div>
        //          <h1>Сессии</h1>
        //          {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
        //          <div className="container">
        //             <table className="table">
        //                 <thead>
        //                     <tr>
        //                         <th><IconButton onClick={this.addSessionClicked}><AddBoxIcon style={{color: "green"}}/></IconButton></th>
        //                         <th>Название</th>
        //                         <th>Тестирование</th>
        //                         <th>Результаты</th>
        //                         <th>Открыть</th>
        //                         <th>Удалить</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                 {
        //                     this.state.sessions.map (
        //                         session =>
        //                             <tr key={session.id}>
        //                                 <td></td>
        //                                 <td>{session.name}</td>
        //                                 <td><button className="btn btn-primary" onClick={() => this.startTestClicked(session.id)}>Начать тест</button></td>
        //                                 <td><button className="btn btn-info" onClick={() => this.openResultsClicked(session.id)}>Результаты</button></td>
        //                                 <td><button className="btn btn-success" onClick={() => this.openSessionClicked(session.id)}>Открыть</button></td>
        //                                 <td><button className="btn btn-warning" onClick={() => this.deleteSessionClicked(session.id)}>Удалить</button></td>
        //                             </tr>
        //                     )
        //                     }
        //                 </tbody>
        //             </table>
        //          </div>
        //     </div>
        // )
    }
}

export default SessionsComponent
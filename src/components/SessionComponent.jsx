import React, {Component} from 'react'
import DataService from "../api/DataService";
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
import { Add, Delete } from '@material-ui/icons';

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

class SessionComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            words : [],
            message : null
        }
        this.deleteWordClicked = this.deleteWordClicked.bind(this)   
        this.addWordClicked = this.addWordClicked.bind(this)
        this.refreshWords = this.refreshWords.bind(this)
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
                title = {<span style={{fontFamily: "Victor Mono Heavy", fontSize: 22}}>Слова сессии</span>}
                columns={[
                    { title: 'Слово', field: 'original', headerStyle: {fontFamily: "Iosevka Semibold", fontSize: 19}},
                    { title: 'Перевод', field: 'translation', headerStyle: {fontFamily: "Iosevka Semibold", fontSize: 19} }
                ]}
                data={this.state.words}  
                options={{
                    actionsColumnIndex: -1,
                    headerStyle: {backgroundColor: '#EEE', fontFamily: "Iosevka Semibold", fontSize: 19},
                    rowStyle: {fontFamily: "Victor Mono"},
                }}     
                actions={[ 
                    {
                        icon: Add,
                        tooltip: 'Добавить слово в сессию',
                        isFreeAction: true,
                        onClick: (event) => this.addWordClicked()
                    },
                    {
                        icon: Delete,
                        tooltip: 'Удалить слово из сессии',
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
        this.refreshWords();
    }

    refreshWords() {
        DataService.retrieveSessionWords(this.props.match.params.id)
          .then(
              response => {
                  this.setState({words : response.data})
              }
          ) 
    }

    deleteWordClicked(id) {
        DataService.deleteWordFromSession(id, this.props.match.params.id)
         .then (
             response => {
                this.setState({message : `Слово удалено из сессии`})
                this.refreshWords()
             }
         )
        
    }

    addWordClicked() {
        let sessionId = this.props.match.params.id;
        this.props.history.push(`/sessions/${sessionId}/add`)
    }

    render() {
        return (
            this.getTable()
        )
    }
}

export default SessionComponent
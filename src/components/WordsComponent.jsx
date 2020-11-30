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

class WordsComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            words : [],
            message : null
        }
        this.deleteWordClicked = this.deleteWordClicked.bind(this)   
        this.updateWordClicked = this.updateWordClicked.bind(this)   
        this.addWordClicked = this.addWordClicked.bind(this)
        this.refreshWords = this.refreshWords.bind(this)
        this.getTable = this.getTable.bind(this)
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    componentDidMount() {
        this.refreshWords();
    }

    refreshWords() {
        let userId = AuthenticationService.getLoggedUserId();
        DataService.retrieveAllWords(userId)
          .then(
              response => {
                  this.setState({words : response.data})
              }
          ) 
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
              title = {<span style={{fontFamily: "Victor Mono Heavy", fontSize: 22}}>Слова</span>}
              columns={[
                { title: <IconButton onClick={this.addWordClicked}><AddBoxIcon/></IconButton>, searchable: false, sorting: false},
                { title: 'Слово', field: 'original'},
                { title: 'Перевод', field: 'translation' },
              ]}
              data={this.state.words}   
              options={{
                actionsColumnIndex: -1,
                headerStyle: {backgroundColor: '#EEE', fontFamily: "Iosevka Semibold", fontSize: 19},
                rowStyle: {fontFamily: "Victor Mono"},
              }}     
              actions={[
                {
                  icon: Edit,
                  tooltip: 'Изменить слово',
                  onClick: (event, rowData) => this.updateWordClicked(rowData.id)
                },
                {
                    icon: Delete,
                    tooltip: 'Удалить слово',
                    onClick: (event, rowData) =>this.deleteWordClicked(rowData.id)
                  }
              ]}
            />
          )
    }

    deleteWordClicked(id) {
        DataService.deleteWord(id)
         .then (
             response => {
                this.setState({message : `Слово удалено`})
                this.refreshWords()
             }
         )
        
    }

    addWordClicked() {
        this.props.history.push(`/words/create`)
    }

    updateWordClicked(id) {
        this.props.history.push(`/words/update/${id}`)
    }

    render() {
        return (
                this.getTable()
        )
    }
}

export default WordsComponent
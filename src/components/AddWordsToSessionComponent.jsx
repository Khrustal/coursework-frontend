import React, {Component} from 'react'
import DataService from "../api/DataService";
import AuthenticationService from '../api/AuthenticationService.js'
import MaterialTable from 'material-table'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green, orange } from '@material-ui/core/colors';

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
import { Add, BorderColor, Delete } from '@material-ui/icons';

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

  const theme = createMuiTheme({
    palette: {
      secondary: {
        main: green[500],
      },
    },
  });

class AddWordsToSessionComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            words : [],
            checkboxes: [],
            message : null
        }
        this.refreshWords = this.refreshWords.bind(this)
        this.addWordsClicked = this.addWordsClicked.bind(this);
        this.getTable = this.getTable.bind(this)
    }

    getTable() {
        return (
            <ThemeProvider theme={theme}>
            <MaterialTable
              icons={tableIcons}
              localization={{
                  header: {
                      actions: "Действия",
                  }
              }}
              title = {<span style={{fontFamily: "Victor Mono Heavy", fontSize: 22}}>Добавить слова в сессию</span>}
              columns={[
                { title: 'Слово', field: 'original'},
                { title: 'Перевод', field: 'translation' },
              ]}
              data={this.state.words}   
              options={{
                selection: true,
                actionsColumnIndex: -1,
                headerStyle: {backgroundColor: '#EEE', fontFamily: "Iosevka Semibold", fontSize: 19},
                rowStyle: {fontFamily: "Victor Mono"}
              }}     
              actions={[
                {
                    icon: Add,
                    tooltip: 'Добавить слова в сессию',
                    onClick: (event, Data) => this.addWordsClicked(Data)
                }
              ]}
            />
            </ThemeProvider>
          )
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

    addWordsClicked(Data) {
        Data.forEach(word => {
                    let request = {
                    sessionId: this.props.match.params.id,
                    wordId: word.id
                    }
                    DataService.addWordToSession(request) 
                })
        // for (let i = 0; i < this.state.words.length; i++) {
        //     if(document.getElementById(this.state.words[i].id).checked) {
        //         let request = {
        //             sessionId: this.props.match.params.id,
        //             wordId: this.state.words[i].id
        //         }
        //         DataService.addWordToSession(request)
        //     }
        //   }
          this.props.history.push(`/sessions/${this.props.match.params.id}`)
    }

    render() {
        return (
            this.getTable()
            // <div>
            //      <h1>Добавить слова в сессию</h1>
            //      {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
            //      <div className="container">
            //         <table className="table">
            //             <thead>
            //                 <tr>
            //                     <th>Выбрано</th>
            //                     <th>Слово</th>
            //                     <th>Перевод</th>
            //                 </tr>
            //             </thead>
            //             <tbody>
            //             {
            //                 this.state.words.map (
            //                     word =>
            //                         <tr key={word.id}>
            //                             <td>
            //                                 <input id={word.id} type="checkbox" name="selected" className="form-check-input"/>
            //                             </td>
            //                             <td>{word.original}</td>
            //                             <td>{word.translation}</td>
            //                         </tr>
            //                 )
            //                 }
            //             </tbody>
            //         </table>
            //         <button className="btn btn-success" onClick={this.addWordsClicked}>+ Добавить</button>
            //      </div>
            // </div>
        )
    }
}

export default AddWordsToSessionComponent
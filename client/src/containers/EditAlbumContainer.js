import { connect } from "react-redux";
import EditAlbum from "../components/EditAlbum";
import { getAlbum, editAlbum } from "../actions";

function mapStateToProps(state) {
  return {
    album: state.album
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAlbum: (id) => {
      const action = getAlbum(id);
      dispatch(action);
    },
    editAlbum: (item) => {
      dispatch(editAlbum(item));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAlbum);

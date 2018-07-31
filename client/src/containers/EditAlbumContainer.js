import { connect } from "react-redux";
import EditAlbum from "../components/EditAlbum";
import { getAlbum, editAlbum } from "../actions";

function mapStateToProps({ album, status }) {
  return {
    album,
    status
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAlbum: (id) => {
      dispatch(getAlbum(id));
    },
    editAlbum: (id, item) => {
      dispatch(editAlbum(id, item));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAlbum);

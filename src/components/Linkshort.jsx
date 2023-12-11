import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {db} from "../firebase";
export default function Linkshort() {
  const {id} = useParams();
  useEffect(() => {
    let query = db.collection("urls").where("id", "==", id);
    query.onSnapshot((data) => {
      let linknge = data.docs[0].data();
      window.location.href = linknge.url;
      console.log(linknge);
    });
  }, []);

  return <></>;
}

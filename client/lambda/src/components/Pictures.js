import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import Contexts from '../contexts'
const {PicturesContext} = Contexts;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: 450,
    overflow: 'auto'
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function (props) {
  const classes = useStyles();
  function renderGrid(picSelector){
    const pictures = picSelector.pictures;
    pictures || picSelector.loadPictures();
    return pictures ? <GridList cellHeight={160} className={classes.gridList} cols={4}>
          {pictures.map(({image_id, image_url}) => {
            let id = image_id,
              url = image_url;
            <GridListTile key={id} cols={1}>
              <img src={url} alt={id}
                className={picSelector.selected.indexOf(id) > -1 ? 'selected' : ''}
                onClick={(e) => {
                  picSelector.selectPictures(picSelector.selected.indexOf(id) == -1 ?
                    [...picSelector.selected, id] : picSelector.selected.filter(p => p.id != id))
                }} />
            </GridListTile>
          })}
        </GridList> : <h3 style={{textAlign: 'center', marginTop: 50}}>No pictures to show</h3>
  }
  return (
    <div className={classes.root}>
      <PicturesContext.Consumer>
        {renderGrid}
      </PicturesContext.Consumer>
    </div>
  );
}

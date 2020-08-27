import * as React from 'react';
import {Photo} from "../model/model";
import './ImageGrid.css';

interface ImageGridProps {
    photos: Photo[];
}

const ImageGrid: React.FC<ImageGridProps> = (props: ImageGridProps) => {
    return (
        <div className={'container'}>
            {props.photos.map(photo => (
                <div className={'image-item-container'}>

                    <img
                        className={'image'}
                        src={`http://farm${photo.farm}.static.flickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}/>
                </div>
            ))}
        </div>
    )
}


export default ImageGrid;
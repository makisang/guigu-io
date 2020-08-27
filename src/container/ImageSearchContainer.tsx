import * as React from 'react';
import {ChangeEvent, useEffect, useState} from "react";
import {sendGetRequest} from "../util/netUtils";
import ImageGrid from "../component/ImageGrid";
import {Photo} from "../model/model";

interface ImageSearchProps {

}

const ImageSearchContainer: React.FC<ImageSearchProps> = () => {
    const [inputText, setInputText] = useState<string>('');
    const [searchText, setSearchText] = useState<string>('');
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        if (!searchText) {
            return;
        }
        sendGetRequest('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3e7cc266ae2b0e0d78e279ce8e361736&format=json&nojsoncallback=1&safe_search=1',
            getParams())
            .then((res: any) => {
                if (res.photos.page > 1) {
                    const newPhotos = [];
                    newPhotos.push(...photos);
                    newPhotos.push(...res.photos.photo);
                    setPhotos(newPhotos);
                } else {
                    setPhotos(res.photos.photo);
                }
                setTotalPage(res.photos.pages);
            }).catch(err => {

        })
    }, [searchText, currentPage]);

    const getParams = (): object => {
        return {
            per_page: 20,
            page: currentPage,
            text: searchText,
        }
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    }

    const onClickSearch = () => {
        setCurrentPage(1);
        setSearchText(inputText);
    }

    const onClickLoadMore = () => {
        setCurrentPage(currentPage + 1);
    }

    return (
        <div>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: '20px',
                marginBottom: '20px'
            }}>
                <input value={inputText} onChange={onInputChange}/>

                <div onClick={onClickSearch}>
                    Search
                </div>

            </div>

            <ImageGrid
                photos={photos}
            />

            {
                photos.length > 0 && searchText && currentPage < totalPage ?
                    <a onClick={onClickLoadMore}>
                        Load More
                    </a> : null
            }

        </div>
    )
}

export default ImageSearchContainer;
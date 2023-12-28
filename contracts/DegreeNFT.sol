//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DegreeNFT is ERC721URIStorage, Ownable {
   
    using Counters for Counters.Counter;
    //_DegreeIds variable has the most recent minted DegreeId
    Counters.Counter private _DegreeIds;


    //The structure to store info about a listed token
    struct ListedDegree {
        uint256 tokenId;
        address owner;
        string studentId;
    }

    //the event emitted when a token is successfully listed
    event DegreeListedSuccess (
        uint256 tokenId,
        string studentId
    );

    mapping(uint256 => ListedDegree) private tokenidToListedDegree;
    mapping(string => ListedDegree) private studentIdidToListedDegree;

    constructor() ERC721("DegreeNFT", "DNFT") Ownable(){}

    //The first time a Degree is created, it is listed here
    function createDegree(string memory DegreeURI,string memory studentId) public payable onlyOwner returns (uint) {
        //Increment the DegreeId counter, which is keeping track of the number of minted NFTs
        _DegreeIds.increment();
        uint256 newDegreeId = _DegreeIds.current();

        //Mint the NFT with DegreeId newDegreeId to the address who called createDegree
        _safeMint(msg.sender, newDegreeId);

        //Map the DegreeId to the DegreeURI (which is an IPFS URL with the NFT metadata)
        _setTokenURI(newDegreeId, DegreeURI);
        tokenidToListedDegree[newDegreeId] = ListedDegree( 
        newDegreeId,
        msg.sender,
        studentId
        );

        return newDegreeId;
    }

    //This will return all the NFTs currently listed to be sold on the marketplace
    function getAllDegrees() public view returns (ListedDegree[] memory) {
        uint nftCount = _DegreeIds.current();
        ListedDegree[] memory Degrees = new ListedDegree[](nftCount);
        uint currentIndex = 0;
        uint currentId;
        //at the moment currentlyListed is true for all, if it becomes false in the future we will 
        //filter out currentlyListed == false over here
        for(uint i=0;i<nftCount;i++)
        {
            currentId = i + 1;
            ListedDegree storage currentItem = tokenidToListedDegree[currentId];
            Degrees[currentIndex] = currentItem;
            currentIndex += 1;
        }
        //the array 'Degrees' has the list of all NFTs in the marketplace
        return Degrees;
    }
    
    //Returns all the NFTs that the current user is owner or seller in
    function getMyNFTs() public view returns (ListedDegree[] memory) {
        uint totalItemCount = _DegreeIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        uint currentId;
        //Important to get a count of all the NFTs that belong to the user before we can make an array for them
        for(uint i=0; i < totalItemCount; i++)
        {
            if(tokenidToListedDegree[i+1].owner == msg.sender ){
                itemCount += 1;
            }
        }

        //Once you have the count of relevant NFTs, create an array then store all the NFTs in it
        ListedDegree[] memory items = new ListedDegree[](itemCount);
        for(uint i=0; i < totalItemCount; i++) {
            if(tokenidToListedDegree[i+1].owner == msg.sender) {
                currentId = i+1;
                ListedDegree storage currentItem = tokenidToListedDegree[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
    function verifyDegree(uint256 tokenid,address studentaddr,string memory studentId) external virtual onlyOwner
    {       
            delete tokenidToListedDegree[tokenid];
            safeTransferFrom(msg.sender, studentaddr,tokenid);
            tokenidToListedDegree[tokenid] = ListedDegree( 
            tokenid,
            studentaddr,
            studentId
        );
    }
    

}

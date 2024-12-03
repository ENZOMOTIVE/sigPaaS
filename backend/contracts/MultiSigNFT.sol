// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MultiSigNFT is ERC721, AccessControl {
    using Counters for Counters.Counter;
    
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant VALIDATOR_ROLE = keccak256("VALIDATOR_ROLE");
    
    Counters.Counter private _tokenIds;
    
    enum MintType { DirectMint, DesignatedRecipient, MarketplaceListing }
    
    struct NFTData {
        string metadataURI;
        address recipient;
        uint256 requiredSignatures;
        mapping(address => bool) signatures;
        bool isValid;
        uint256 signatureCount;
        bool useCustomValidators;
        address[] customValidators;
        bool isPFP;
        uint256 price;
        bool isClaimed;
        MintType mintType;
    }
    
    mapping(uint256 => NFTData) public nftData;
    
    event NFTCreated(uint256 tokenId, address recipient, string metadataURI, bool isPFP, uint256 price, MintType mintType);
    event NFTSigned(uint256 tokenId, address signer);
    event NFTValidated(uint256 tokenId);
    event NFTClaimed(uint256 tokenId, address recipient);
    event PriceUpdated(uint256 tokenId, uint256 newPrice);
    
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }
    
    function createNFT(
        address recipient,
        string memory metadataURI,
        uint256 requiredSignatures,
        bool useCustomValidators,
        address[] memory customValidators,
        bool isPFP,
        uint256 price,
        MintType mintType
    ) public onlyRole(MINTER_ROLE) returns (uint256) {
        require(requiredSignatures > 0, "Required signatures must be greater than 0");
        if (useCustomValidators) {
            require(customValidators.length >= requiredSignatures, "Not enough custom validators");
        }
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        NFTData storage data = nftData[newTokenId];
        data.metadataURI = metadataURI;
        data.recipient = recipient;
        data.requiredSignatures = requiredSignatures;
        data.isValid = false;
        data.signatureCount = 0;
        data.useCustomValidators = useCustomValidators;
        data.isPFP = isPFP;
        data.price = price;
        data.isClaimed = false;
        data.mintType = mintType;
        
        if (useCustomValidators) {
            for (uint i = 0; i < customValidators.length; i++) {
                data.customValidators.push(customValidators[i]);
            }
        }
        
        emit NFTCreated(newTokenId, recipient, metadataURI, isPFP, price, mintType);
        return newTokenId;
    }
    
    function signNFT(uint256 tokenId) public {
        NFTData storage data = nftData[tokenId];
        require(!data.isValid, "NFT already validated");
        require(!data.signatures[msg.sender], "Already signed by this validator");
        
        if (data.useCustomValidators) {
            require(isCustomValidator(tokenId, msg.sender), "Not a custom validator for this NFT");
        } else {
            require(hasRole(VALIDATOR_ROLE, msg.sender), "Must have validator role");
        }
        
        data.signatures[msg.sender] = true;
        data.signatureCount++;
        
        emit NFTSigned(tokenId, msg.sender);
        
        if (data.signatureCount >= data.requiredSignatures) {
            data.isValid = true;
            emit NFTValidated(tokenId);
            
            if (data.mintType == MintType.DirectMint) {
                _mint(data.recipient, tokenId);
                data.isClaimed = true;
                emit NFTClaimed(tokenId, data.recipient);
            }
        }
    }
    
    function claimNFT(uint256 tokenId) public {
        NFTData storage data = nftData[tokenId];
        require(data.isValid, "NFT not yet validated");
        require(!data.isClaimed, "NFT already claimed");
        
        if (data.mintType == MintType.DesignatedRecipient) {
            require(msg.sender == data.recipient, "Only designated recipient can claim");
        } else if (data.mintType == MintType.MarketplaceListing) {
            // Anyone can claim in marketplace model
            data.recipient = msg.sender;
        } else {
            revert("NFT is not claimable");
        }
        
        _mint(data.recipient, tokenId);
        data.isClaimed = true;
        
        emit NFTClaimed(tokenId, data.recipient);
    }
    
    function updatePrice(uint256 tokenId, uint256 newPrice) public {
        require(_exists(tokenId), "NFT does not exist");
        require(ownerOf(tokenId) == msg.sender, "Only owner can update price");
        
        nftData[tokenId].price = newPrice;
        emit PriceUpdated(tokenId, newPrice);
    }
    
    function isCustomValidator(uint256 tokenId, address validator) public view returns (bool) {
        NFTData storage data = nftData[tokenId];
        for (uint i = 0; i < data.customValidators.length; i++) {
            if (data.customValidators[i] == validator) {
                return true;
            }
        }
        return false;
    }
    
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return nftData[tokenId].metadataURI;
    }
    
    function getSignatureCount(uint256 tokenId) public view returns (uint256) {
        return nftData[tokenId].signatureCount;
    }
    
    function isNFTValid(uint256 tokenId) public view returns (bool) {
        return nftData[tokenId].isValid;
    }
    
    function isNFTClaimed(uint256 tokenId) public view returns (bool) {
        return nftData[tokenId].isClaimed;
    }
    
    function isPFPNFT(uint256 tokenId) public view returns (bool) {
        return nftData[tokenId].isPFP;
    }
    
    function getNFTPrice(uint256 tokenId) public view returns (uint256) {
        require(_exists(tokenId), "NFT does not exist");
        return nftData[tokenId].price;
    }
    
    function getNFTMintType(uint256 tokenId) public view returns (MintType) {
        require(_exists(tokenId), "NFT does not exist");
        return nftData[tokenId].mintType;
    }
    
    function addMinter(address minter) public onlyRole(ADMIN_ROLE) {
        grantRole(MINTER_ROLE, minter);
    }
    
    function removeMinter(address minter) public onlyRole(ADMIN_ROLE) {
        revokeRole(MINTER_ROLE, minter);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}


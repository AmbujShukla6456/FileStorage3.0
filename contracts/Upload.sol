//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Upload{
    
    struct Access{
        address user;
        bool access;
    }

    mapping(address=>string[]) Value;
    mapping(address=>mapping(address=>bool)) ownerShip;
    mapping(address=>Access[]) accesssList;
    mapping(address=>mapping(address=>bool)) previousData;

    function add(address _user,string memory url) external{
        Value[_user].push(url);
    }

    function allow(address user) external{
        ownerShip[msg.sender][user]=true;
        if(previousData[msg.sender][user]){
            for(uint i=0;i<accesssList[msg.sender].length;i++)
                if(accesssList[msg.sender][i].user==user)
                    accesssList[msg.sender][i].access==true;
        }
        else{
            accesssList[msg.sender].push(Access(user,true));
            previousData[msg.sender][user]=true;
        }
    }
    function disAllow(address user) external {
        ownerShip[msg.sender][user]=false;
        for(uint i=0;i<accesssList[msg.sender].length;i++){
            if(accesssList[msg.sender][i].user==user){
                accesssList[msg.sender][i].access==false;
            }
        }
    }
    function display(address _user) external view returns(string[] memory){
        require(_user==msg.sender || ownerShip[_user][msg.sender],"You don't have access");
        return Value[_user];
    }
    function shareAccess() public view returns(Access[] memory){
        return accesssList[msg.sender];
    }

}
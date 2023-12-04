#!/bin/bash

usage() {
	echo ""
	echo -e "\e[91m缺少必要的参数：\e[0m"
	echo "* 参数说明 *"
	echo "  commit  本地提交代码"
	echo "  pull    拉取远程代码"
	echo "  push    推送本地代码"
	echo ""
	echo ""
}

# 查看当前仓库有无提交，验证其是否为一个合法的 git 仓库
check() {
	git status
	if [ $? == "0" ]
	then
		$1
	else
		echo -e "\n\e[91m当前目录不是git仓库，请将脚本移动到git仓库下执行\e[0m\n"
		exit -1
	fi
}

# 确认是否先本地提交代码
confirm() {
	echo ""
    read -p "是否先提交本地代码? (y/n): " c

    case $c in
        [yY][eE][sS]|[yY])
            $1 && $2
            ;;
		*)
			$2
    esac
}

# 提交代码到本地仓库
commit() {
	echo -e "\n* 提交代码到本地仓库\n"
	read -p "输入提交信息: " msg

	git add .

    git commit -m "${msg}" --no-verify
}

# 执行拉取
pull() {
	confirm commit pullOrigin
}

# 拉取远程仓库分支代码
pullOrigin() {
	echo ""

    # 输入拉取远程仓库的分支名称
    read -p "输入远程仓库的分支(默认按Enter): " br
	echo -e "\n* 开始拉取代码..."
    if [ "$br" != "" ]
    then
        git pull origin $br
    else
        git pull
    fi
}

# 执行推送
push() {
    confirm commit pushOrigin
}

# 推送到远程分支代码
pushOrigin() {
    # 输入推到远程仓库的分支名称
    read -p "输入远程仓库的分支(默认按Enter): " br
	echo -e "\n* 开始推送代码..."
    if [ "$br" != "" ]
    then
        git push origin $br
    else
        git push
    fi
}


case $1 in
	[cC][oO][mM][mM][iI][tT])
		check commit
		;;
	[pP][uU][lL][lL])
		check pull
		;;
	[pP][uU][sS][hH])
		check push
		;;
	*)
		usage
esac

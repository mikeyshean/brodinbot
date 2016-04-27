class Api::UsersController < ApplicationController

  def index
    @users = User.all
    render 'index'
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy

    render json: {}, status: 200
  end

end

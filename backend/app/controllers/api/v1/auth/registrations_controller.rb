class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

  def sign_up_params
    params.require(:registration).permit(:email, :password)
  end
end
